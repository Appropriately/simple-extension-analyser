import { useEffect, useState } from "react";

import CodeBlock from "@/components/code";

import { getEntryData } from "../utils";
import { ExtendedEntry } from "../types";
import { useToasts } from "@/features/toasts";

const ALLOWED_EXTENSIONS = [".json", ".txt", ".md", ".js", ".html", ".css"];

function EntryView({ entry }: { entry: ExtendedEntry }) {
  const [rawData, setRawData] = useState<string>();

  const toasts = useToasts();

  useEffect(() => {
    if (ALLOWED_EXTENSIONS.some((ext) => entry.filename.endsWith(ext))) {
      try {
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
    <div className="entry">
      <p>Size: {entry.uncompressedSize} bytes</p>
      <p>Last modified: {new Date(entry.lastModDate).toLocaleString()}</p>

      {rawData ? (
        <CodeBlock language={entry.filename.split(".").pop()} raw={rawData} />
      ) : null}
    </div>
  );
}

export default EntryView;
