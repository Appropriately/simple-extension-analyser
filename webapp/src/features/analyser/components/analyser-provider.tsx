import { ReactNode, useEffect, useRef, useState } from "react";

import { AnalyserContext } from "../contexts";
import {
  AnalysedFileResponse,
  AnalyserStatus,
  WorkerRequest,
  WorkerResponse,
} from "../types";

interface Props {
  children: ReactNode;
}

type MessageHandlerCallback = (payload: string) => void;

export function AnalyserProvider({ children }: Props) {
  const worker = useRef<Worker>(null);
  const currentHandler = useRef<
    ((event: MessageEvent<WorkerResponse>) => void) | null
  >(null);

  const [status, setStatus] = useState<AnalyserStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (worker.current) return; // Worker already initialized

    setStatus("initializing");
    setError(null);

    worker.current = new Worker(
      new URL("../workers/analyser.worker.ts", import.meta.url),
      { type: "module" }
    );

    worker.current.onmessage = (event: MessageEvent<WorkerResponse>) => {
      const { type, payload } = event.data;

      switch (type) {
        case "READY":
          setStatus("ready");
          break;
        case "ERROR":
          setStatus("error");
          setError(payload);
          console.error("[Hook] Worker error:", payload);
          break;
        case "RESULT":
          break; // Handle result in implementation.
      }
    };

    worker.current.onerror = (error) => {
      console.error("[Hook] Worker error event:", error);
      setError(`Worker error: ${error.message || "Unknown worker error"}`);
    };
  }, [status]);

  const createMessageHandler = (callback: MessageHandlerCallback) => {
    return (event: MessageEvent<WorkerResponse>) => {
      try {
        const { type, payload } = event.data;

        switch (type) {
          case "RESULT":
            setStatus("ready");
            callback(payload);
            break;
          case "ERROR":
            setStatus("ready");
            setError(payload);
            throw new Error(payload);
        }
      } finally {
        if (currentHandler.current) {
          worker.current?.removeEventListener(
            "message",
            currentHandler.current
          );
          currentHandler.current = null;
        }
      }
    };
  };

  const initialiseByFile = (file: File): Promise<string> => {
    if (worker.current && (status === "ready" || status === "busy")) {
      setStatus("busy");

      return new Promise((resolve) => {
        currentHandler.current = createMessageHandler(resolve);
        worker.current?.addEventListener("message", currentHandler.current);

        file
          .arrayBuffer()
          .then((buffer) => {
            const message: WorkerRequest = {
              type: "SETUP",
              payload: buffer,
            };
            worker.current?.postMessage(message, [buffer]);
          })
          .catch((err) => {
            setError(`Failed to read file: ${err.message}`);
            setStatus("ready");
            if (currentHandler.current) {
              worker.current?.removeEventListener(
                "message",
                currentHandler.current
              );
              currentHandler.current = null;
            }
            throw err;
          });
      });
    } else {
      return Promise.reject(new Error("Worker not ready to analyze."));
    }
  };

  const analyseFile = (id: string): Promise<AnalysedFileResponse> => {
    if (worker.current && (status === "ready" || status === "busy")) {
      setStatus("busy");

      return new Promise((resolve) => {
        currentHandler.current = createMessageHandler((payload) =>
          resolve(JSON.parse(payload))
        );
        worker.current?.addEventListener("message", currentHandler.current);

        const message: WorkerRequest = { type: "ANALYSE", payload: { id } };
        worker.current?.postMessage(message);
      });
    } else {
      return Promise.reject(new Error("Worker not ready to analyze."));
    }
  };

  return (
    <AnalyserContext.Provider
      value={{ status, error, analyseFile, initialiseByFile }}
    >
      {children}
    </AnalyserContext.Provider>
  );
}

export default AnalyserProvider;
