export type AnalysisId = string;
export type AnalysisStatus = "completed" | "queued" | "in-progress";

interface Data {
  id: AnalysisId;
  type: "analysis";
  meta: Record<string, unknown>;
}

interface Result {
  engine_name: string;
  method: "blacklist" | string;
  category:
    | "confirmed-timeout"
    | "timeout"
    | "failure"
    | "harmless"
    | "undetected"
    | "suspicious"
    | "malicious"
    | "type-unsupported";
  result: "unrated" | "clean" | "malicious" | "phishing" | string;
}

interface UrlInfo {
  id: string;
  url: string;
}

interface Meta {
  [key: string]: unknown;
}

interface UrlAnalysisMeta extends Meta {
  url_info: UrlInfo;
}

interface UrlAnalysisData extends Data {
  links: {
    self: string;
    url: string;
  };
  attributes: {
    date: number;
    results: Record<string, Result>;
    stats: {
      harmless: number;
      malicious: number;
      suspicious: number;
      timeout: number;
      undetected: number;
    };
    status: AnalysisStatus;
  };
}

export interface Analysis {
  data: Data;
  meta: Record<string, unknown>;
}

export interface UrlAnalysis {
  data: UrlAnalysisData;
  meta: UrlAnalysisMeta;
}
