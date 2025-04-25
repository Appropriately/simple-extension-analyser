import { Entry } from "@zip.js/zip.js";

export interface ExtendedEntry extends Entry {
    _?: string;
}

export interface EntryTreeNode {
    name: string;
    path: string;
    entries: ExtendedEntry[];
    children: EntryTreeNode[];
}

export interface EntryTreeFilters {
    term?: string;
}
