import { useEffect, useState } from "react";

import CodeBlock from "@/components/code";
import { TextWriter } from "@zip.js/zip.js";

import { ExtendedEntry } from "../types/entry";

const ALLOWED_EXTENSIONS = [".json", ".txt", ".md", ".js", ".html", ".css"];

function EntryView({ entry }: { entry: ExtendedEntry }) {
  const [rawData, setRawData] = useState<string>();

  useEffect(() => {
    if (
      ALLOWED_EXTENSIONS.some((ext) => entry.filename.endsWith(ext)) &&
      entry.getData
    ) {
      entry
        .getData(new TextWriter())
        .then((data) => {
          setRawData(data);
        })
        .catch((error) => {
          console.error("Error reading entry data:", error);
          setRawData(undefined);
        });
    } else {
      setRawData(undefined);
    }
  }, [entry]);

  return (
    <div className="entry">
      <p>Size: {entry.uncompressedSize} bytes</p>
      <p>Last modified: {new Date(entry.lastModDate).toLocaleString()}</p>
      {rawData ? <CodeBlock raw={rawData} /> : <p>No raw data available</p>}
    </div>
  );
}

export default EntryView;
