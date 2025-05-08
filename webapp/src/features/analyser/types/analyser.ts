export type AnalyserStatus =
  | "idle"
  | "initializing"
  | "ready"
  | "busy"
  | "error";

export type AnalysedFileResponse = Record<string, unknown>;

export interface AnalyserHandle {
  status: AnalyserStatus;
  error: string | null;

  initialiseByFile: (file: File) => Promise<string>;
  analyseFile: (id: string) => Promise<AnalysedFileResponse>;
}

export type WorkerRequest =
  | { type: "SETUP"; payload: ArrayBuffer }
  | { type: "ANALYSE"; payload: { id: string } }
  | { type: "EXTRACT"; payload: { buffer: ArrayBuffer; filename: string } };

export type WorkerResponse = {
  type: "READY" | "RESULT" | "ERROR";
  payload: string;
};
