export type AnalyserStatus =
  | "idle"
  | "initializing"
  | "ready"
  | "busy"
  | "error";

export interface AnalysedFileResponse {
  [key: string]: unknown;
}

export interface AnalyserHandle {
  status: AnalyserStatus;
  error: string | null;

  analyseFile: (file: File) => Promise<AnalysedFileResponse>;
}

export type WorkerRequest =
  | { type: "ANALYSE"; payload: ArrayBuffer }
  | { type: "EXTRACT"; payload: { buffer: ArrayBuffer; filename: string } };

export type WorkerResponse = {
  type: "READY" | "RESULT" | "ERROR";
  payload: string;
};
