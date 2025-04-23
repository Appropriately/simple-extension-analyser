import { BlobReader, ZipReader } from "@zip.js/zip.js";

import { Extension } from "../types";
import { buildEntryTree, parseManifestEntry } from "./entries";

/**
 * Returns the extension ID. Hashes the extension ID if it is not pulled
 * from the appropriate store.
 * @param extension The extension object.
 * @returns The extension ID.
 */
export const getExtensionId = (extension: Extension): string => {
    if (extension.extensionId) return extension.extensionId;

    return "!";
}

/**
 * Takes a file and returns an extension object.
 * @param file The file upload.
 * @returns The extension object.
 */
export const setupExtensionFromFile = async (file: File) => {
    const extension: Extension = {
        filename: file.name,
    };

    const entries = await (new ZipReader(new BlobReader(file))).getEntries();
    extension.entryTree = await buildEntryTree(entries);

    const manifestEntry = entries.find((entry) => entry.filename.endsWith("manifest.json"));
    if (!manifestEntry) throw new Error("No manifest entry found");

    const manifest = await parseManifestEntry(manifestEntry);
    if (!manifest) throw new Error("Failed to parse manifest entry");

    extension.manifest = manifest;

    if (!extension.entryTree) throw new Error("Failed to build entry tree");
    if (!extension.manifest) throw new Error("Failed to parse manifest");

    return extension;
}
