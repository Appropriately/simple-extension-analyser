import { useEffect, useState } from "react";

import Card from "@/components/card";
import CodeBlock from "@/components/code";
import Table from "@/components/table";
import { useToasts } from "@/features/toasts";

import { ExtendedEntry } from "../types";
import { getEntryData } from "../utils";

const ALLOWED_EXTENSIONS = [".json", ".txt", ".md", ".js", ".html", ".css"];

function EntryView({ entry }: { entry: ExtendedEntry }) {
  const [rawData, setRawData] = useState<string>();

  const toasts = useToasts();

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
            if (error instanceof Error) toasts.error(error);
            setRawData(undefined);
          });
      } catch (error) {
        if (error instanceof Error) toasts.error(error);
        setRawData(undefined);
      }
    } else {
      setRawData(undefined);
    }
  }, [entry, toasts]);

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
        <CodeBlock language={entry.filename.split(".").pop()} raw={rawData} />
      ) : null}
    </div>
  );
}

export default EntryView;
