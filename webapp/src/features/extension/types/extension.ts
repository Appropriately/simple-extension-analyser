import { ExtendedEntry } from "./entry";
import { Manifest } from "./manifest";

export interface AnalysedFile {
  name: string;
  path: string;
  urls?: string[];
}

// /**
//  * Represents a browser extension.
//  */
export interface Extension {
  extensionId?: string;
  filename?: string;
  entries?: ExtendedEntry[];
  manifest?: Manifest;
  analysedFiles?: Record<string, AnalysedFile>;
}
