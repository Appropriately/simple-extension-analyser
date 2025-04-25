import { ExtendedEntry } from "./entry";
import { Manifest } from "./manifest";

// /**
//  * Represents a browser extension.
//  */
export interface Extension {
  extensionId?: string;
  filename?: string;
  entries?: ExtendedEntry[];
  manifest?: Manifest;
}
