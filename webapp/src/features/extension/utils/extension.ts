import { BlobReader, Entry, ZipReader } from "@zip.js/zip.js";
import { EntryTreeNode } from "../types/entry";
import { buildEntryTree } from "./entries";


/**
 * Represents a browser extension.
 */
export class Extension {
    filename?: string;
    entryTree?: EntryTreeNode;

    /**
     * Sets up the extension class from a file.
     * @param {File} file - The file to set up the extension from.
     */
    async setupFromFile(file: File) {
        const entries = await (new ZipReader(new BlobReader(file))).getEntries();
        this.filename = file.name;

        this.entryTree = buildEntryTree(entries);
    }

    /**
     * Returns all entries in the entity tree.
     * @returns {Entry[]} An array of entries.
     */
    entries(): Entry[] {
        if (!this.entryTree) {
            throw new Error("Entity tree is not initialized");
        }

        const entries: Entry[] = [];
        const traverse = (node: EntryTreeNode) => {
            if (node.entries) {
                entries.push(...node.entries);
            }
            if (node.children) {
                node.children.forEach(traverse);
            }
        };
        traverse(this.entryTree);
        return entries;
    }
}
