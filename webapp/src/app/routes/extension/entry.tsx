import { useEffect, useMemo, useState } from "react";

import Card from "@/components/card";
import CodeBlock from "@/components/code";
import Table from "@/components/table";
import { Extension, getEntryData } from "@/features/extension";
import { useEntryContext } from "@/features/extension/context";
import { useToasts } from "@/features/toasts";

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

interface Props {
  extension: Extension;
}

function EntryView({ extension }: Props) {
  const { entry } = useEntryContext();

  const { error: toastError } = useToasts();

  const [rawData, setRawData] = useState<string>();

  const tableItems = [
    { label: "Comment", value: entry?.comment },
    { label: "Encrypted", value: entry?.encrypted ? "Yes" : "No" },
    { label: "Compressed size", value: `${entry?.compressedSize} bytes` },
    { label: "Uncompressed size", value: `${entry?.uncompressedSize} bytes` },
    {
      label: "Last modified",
      value: new Date(entry?.lastModDate ?? 0).toLocaleString(),
    },
    ...Object.entries(entry?.extraField ?? {}).map(([key, value]) => ({
      label: key,
      value: Array.isArray(value) ? value.join(", ") : value,
    })),
  ];

  useEffect(() => {
    if (
      entry &&
      ALLOWED_EXTENSIONS.some((ext) => entry.filename.endsWith(ext))
    ) {
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

  const analysedFile = useMemo(() => {
    if (entry) return extension.analysedFiles?.[entry.filename];
    return undefined;
  }, [entry, extension]);

  if (!entry) {
    return <div className="text-zinc-300">No entry selected</div>;
  }

  return (
    <div>
      <Card className="mb-3">
        <Card.Header>
          <h2 className="text-lg font-semibold">
            {entry.filename.split("/").pop()}
          </h2>
        </Card.Header>
        <Card.Body>
          <Table
            data={tableItems}
            columns={[
              { label: "Label", key: "label", width: "200px" },
              { label: "Value", key: "value" },
            ]}
            skipHeader
          />
        </Card.Body>
      </Card>

      {analysedFile && (
        <Card className="mb-3">
          <Card.Header>Analysis</Card.Header>
          <Card.Body>{JSON.stringify(analysedFile.urls, null, 2)}</Card.Body>
        </Card>
      )}

      {rawData ? (
        <CodeBlock
          language={
            FILE_EXTENSION_TO_LANGUAGE[
              entry.filename.split(".").pop()!.toLowerCase()
            ] ?? entry.filename.split(".").pop()
          }
          raw={rawData}
        />
      ) : null}
    </div>
  );
}

export default EntryView;
