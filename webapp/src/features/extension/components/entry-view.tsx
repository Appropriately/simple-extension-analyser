import { useEffect, useState } from "react";

import Card from "@/components/card";
import CodeBlock from "@/components/code";
import Table from "@/components/table";
import { useToasts } from "@/features/toasts";

import { ExtendedEntry } from "../types";
import { getEntryData } from "../utils";

const ALLOWED_EXTENSIONS = [".json", ".txt", ".md", ".js", ".html", ".css"];

// Map of common file extensions to their corresponding language identifiers.
// The code component will otherwise attempt to guess the language.
const FILE_EXTENSION_TO_LANGUAGE: Record<string, string> = {
  cs: "csharp",
  js: "javascript",
  kt: "kotlin",
  md: "markdown",
  pl: "perl",
  py: "python",
  rb: "ruby",
  rs: "rust",
};

function EntryView({ entry }: { entry: ExtendedEntry }) {
  const [rawData, setRawData] = useState<string>();

  const { error: toastError } = useToasts();

  const tableItems = [
    { label: "Comment", value: entry.comment },
    { label: "Encrypted", value: entry.encrypted ? "Yes" : "No" },
    { label: "Compressed size", value: `${entry.compressedSize} bytes` },
    { label: "Uncompressed size", value: `${entry.uncompressedSize} bytes` },
    {
      label: "Last modified",
      value: new Date(entry.lastModDate).toLocaleString(),
    },
    ...Object.entries(entry.extraField ?? {}).map(([key, value]) => ({
      label: key,
      value: Array.isArray(value) ? value.join(", ") : value,
    })),
  ];

  useEffect(() => {
    if (ALLOWED_EXTENSIONS.some((ext) => entry.filename.endsWith(ext))) {
      try {
        setRawData(undefined);
        getEntryData(entry)
          .then((data) => setRawData(data ? data : undefined))
          .catch((error) => {
            if (error instanceof Error) toastError(error);
            setRawData(undefined);
          });
      } catch (error) {
        if (error instanceof Error) toastError(error);
        setRawData(undefined);
      }
    } else {
      setRawData(undefined);
    }
  }, [entry, toastError]);

  return (
    <div>
      <Card header={entry.filename.split("/").pop()} className="mb-3">
        <Table
          data={tableItems}
          columns={[
            { label: "Label", key: "label", width: "200px" },
            { label: "Value", key: "value" },
          ]}
          skipHeader
        />
      </Card>

      {rawData ? (
        <CodeBlock
          language={
            FILE_EXTENSION_TO_LANGUAGE[entry.filename.split(".").pop()!] ??
            entry.filename.split(".").pop()
          }
          raw={rawData}
        />
      ) : null}
    </div>
  );
}

export default EntryView;
