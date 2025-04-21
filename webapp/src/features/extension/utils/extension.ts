import { BlobReader, Entry, ZipReader } from "@zip.js/zip.js";

import { EntryTreeNode } from "../types/entry";
import { Manifest } from "../types/manifest";
import { buildEntryTree, parseManifestEntry } from "./entries";

/**
 * Represents a browser extension.
 */
export class Extension {
    filename?: string;
    entryTree?: EntryTreeNode;

    manifest?: Manifest;

    /**
     * Sets up the extension class from a file.
     * @param {File} file - The file to set up the extension from.
     */
    async setupFromFile(file: File) {
        this.filename = file.name;

        const entries = await (new ZipReader(new BlobReader(file))).getEntries();
        this.entryTree = await buildEntryTree(entries);

        const manifestEntry = entries.find((entry) => entry.filename.endsWith("manifest.json"));
        if (!manifestEntry) throw new Error("No manifest entry found");

        const manifest = await parseManifestEntry(manifestEntry);
        if (!manifest) throw new Error("Failed to parse manifest entry");

        this.manifest = manifest;

        if (!this.entryTree) throw new Error("Failed to build entry tree");
        if (!this.manifest) throw new Error("Failed to parse manifest");
    }

    /**
     * Returns all entries in the entity tree.
     * @returns {Entry[]} An array of entries.
     */
    entries(): Entry[] {
        if (!this.entryTree) throw new Error("Entity tree is not initialized");

        const entries: Entry[] = [];
        const traverse = (node: EntryTreeNode) => {
            if (node.entries) entries.push(...node.entries);
            if (node.children) node.children.forEach(traverse);
        };
        traverse(this.entryTree);
        return entries;
    }
}
