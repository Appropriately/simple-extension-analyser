import { Extension } from "../lib/analyser/analyser.js";
import { WorkerRequest, WorkerResponse } from "../types";

let analyser: typeof import("../lib/analyser/analyser.js") | null = null;
let initError: Error | null = null;

const EXTENSION_BY_ID: Record<string, Extension> = {};

(async () => {
  try {
    const analyserModule = await import("../lib/analyser/analyser.js");
    await analyserModule.default();

    analyser = analyserModule;

    self.postMessage({
      type: "READY",
      payload: "Worker ready",
    } as WorkerResponse);
  } catch (err) {
    console.error("[Worker] Failed to initialize Wasm module:", err);
    initError = err instanceof Error ? err : new Error(String(err));

    self.postMessage({
      type: "ERROR",
      payload: `Wasm Initialization Failed: ${initError.message}`,
    } as WorkerResponse);
  }
})();

self.onmessage = async (event: MessageEvent<WorkerRequest>) => {
  if (initError) {
    self.postMessage({
      type: "ERROR",
      payload: `Worker in error state: ${initError.message}`,
    } as WorkerResponse);
    return;
  }

  if (!analyser) {
    self.postMessage({
      type: "ERROR",
      payload: "Wasm module not yet initialized.",
    } as WorkerResponse);
    return;
  }

  const { type, payload } = event.data;

  try {
    switch (type) {
      case "SETUP": {
        const extension = new analyser.Extension(new Uint8Array(payload));
        EXTENSION_BY_ID[extension.get_id()] = extension;

        self.postMessage({
          type: "RESULT",
          payload: extension.get_id(),
        } as WorkerResponse);
        break;
      }
      case "ANALYSE": {
        const { id } = payload;
        const extension = EXTENSION_BY_ID[id];
        if (!extension) {
          self.postMessage({
            type: "ERROR",
            payload: `Extension not found: ${id}`,
          } as WorkerResponse);
          return;
        }

        const resultJson = extension.analyse_files();
        self.postMessage({
          type: "RESULT",
          payload: resultJson,
        } as WorkerResponse);
        break;
      }

      default:
        console.warn("[Worker] Unknown message type:", type);
    }
  } catch (err) {
    console.error("[Worker] Error processing message:", err);
    const errorMessage = err instanceof Error ? err.message : String(err);
    self.postMessage({
      type: "ERROR",
      payload: `Processing Error: ${errorMessage}`,
    } as WorkerResponse);
  }
};

self.addEventListener("unhandledrejection", (event) => {
  console.error("[Worker] Unhandled rejection:", event.reason);
  self.postMessage({
    type: "ERROR",
    payload: `Unhandled rejection: ${event.reason}`,
  } as WorkerResponse);
});

self.addEventListener("unload", () => {
  for (const extension of Object.values(EXTENSION_BY_ID)) {
    extension.free();
    delete EXTENSION_BY_ID[extension.get_id()];
  }
});
