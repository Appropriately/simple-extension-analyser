import { BlobReader, ZipReader } from "@zip.js/zip.js";

import { Extension } from "../types";
import { parseManifestEntry } from "./entries";

/**
 * Takes a file and returns an extension object.
 * @param file The file upload.
 * @returns The extension object.
 */
export const setupExtensionFromFile = async (file: File) => {
  const extension: Extension = {
    filename: file.name,
  };

  extension.entries = await new ZipReader(new BlobReader(file)).getEntries();

  const manifestEntry = extension.entries.find((entry) =>
    entry.filename.endsWith("manifest.json")
  );
  if (!manifestEntry) throw new Error("No manifest entry found");

  extension.manifest = await parseManifestEntry(manifestEntry);
  if (!extension.manifest) throw new Error("Failed to parse manifest entry");

  return extension;
};
