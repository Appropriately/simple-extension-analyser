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

export function AnalyserProvider({ children }: Props) {
  const worker = useRef<Worker>(null);

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

  // Sends a file to the worker for analysis, returning a JSON response.
  const analyseFile = (file: File): Promise<AnalysedFileResponse> => {
    if (worker.current && (status === "ready" || status === "busy")) {
      setStatus("busy");

      return new Promise((resolve, reject) => {
        const handleMessage = (event: MessageEvent<WorkerResponse>) => {
          const { type, payload } = event.data;

          switch (type) {
            case "RESULT":
              setStatus("ready");
              worker.current?.removeEventListener("message", handleMessage);
              resolve(JSON.parse(payload));
              break;
            case "ERROR":
              setStatus("ready");
              setError(payload);
              worker.current?.removeEventListener("message", handleMessage);
              reject(new Error(payload));
              break;
          }
        };

        worker.current?.addEventListener("message", handleMessage);

        file
          .arrayBuffer()
          .then((buffer) => {
            const message: WorkerRequest = { type: "ANALYSE", payload: buffer };
            worker.current?.postMessage(message, [buffer]);
          })
          .catch((err) => {
            setError(`Failed to read file: ${err.message}`);
            setStatus("ready");
            worker.current?.removeEventListener("message", handleMessage);
            reject(err);
          });
      });
    } else {
      return Promise.reject(new Error("Worker not ready to analyze."));
    }
  };

  return (
    <AnalyserContext.Provider value={{ status, error, analyseFile }}>
      {children}
    </AnalyserContext.Provider>
  );
}

export default AnalyserProvider;
