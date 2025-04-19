import { Entry } from "@zip.js/zip.js";

export interface EntryTreeNode {
    name: string;
    path: string;
    entries: Entry[];
    children: EntryTreeNode[];
}
