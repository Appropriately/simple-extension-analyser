import { BlobReader, TextWriter, ZipReader } from "@zip.js/zip.js";

import { ExtendedEntry, Extension } from "../types";
import { parseManifestEntry } from "./entries";

// Returns all locale entries.
const getLocaleEntries = (entries: ExtendedEntry[]) =>
  entries
    .filter((entry) => entry.filename.startsWith("_locales/"))
    .filter((entry) => entry.filename.endsWith("messages.json"));

// Takes a key and returns the translation text.
// If the key is not found, it returns null.
const translationStringToText = async (
  localeEntries: ExtendedEntry[],
  key: string
) => {
  const tidiedKey = key.replace("__MSG_", "").slice(0, -2);

  // Order locale entries by en-GB, en, then the rest
  const orderedLocaleEntries = localeEntries.sort((a, b) => {
    if (a.filename.startsWith("_locales/en_GB/")) return -1;
    if (b.filename.startsWith("_locales/en_GB/")) return 1;
    if (a.filename.startsWith("_locales/en")) return -1;
    if (b.filename.startsWith("_locales/en")) return 1;
    return 0;
  });

  for (const entry of orderedLocaleEntries) {
    if (!entry || !entry.getData) continue;

    const content = JSON.parse(await entry.getData(new TextWriter()));
    if (content[tidiedKey]) return content[tidiedKey].message;
  }

  return null;
};

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

  const localeEntries = getLocaleEntries(extension.entries);

  extension.name = extension.manifest.name;
  if (extension.name.startsWith("__MSG_")) {
    const translationName = await translationStringToText(
      localeEntries,
      extension.name
    );
    if (translationName) extension.name = translationName;
  }

  extension.version = extension.manifest.version;

  extension.description = extension.manifest.description;
  if (extension.description && extension.description.startsWith("__MSG_")) {
    const translationName = await translationStringToText(
      localeEntries,
      extension.description
    );
    if (translationName) extension.description = translationName;
  }

  return extension;
};
