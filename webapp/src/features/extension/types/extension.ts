
import { EntryTreeNode } from "./entry";
import { Manifest } from "./manifest";

// /**
//  * Represents a browser extension.
//  */
export interface Extension {
    extensionId?: string;
    filename?: string;
    entryTree?: EntryTreeNode;
    manifest?: Manifest;
}