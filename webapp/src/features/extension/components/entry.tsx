import { TextWriter } from "@zip.js/zip.js";
import { useEffect, useState } from "react";
import { ExtendedEntry } from "../types/entry";

const ALLOWED_EXTENSIONS = [".json", ".txt", ".md", ".js"];

function Entry({ entry }: { entry: ExtendedEntry }) {
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
      <h2>{entry.filename}</h2>
      <p>Size: {entry.uncompressedSize} bytes</p>
      <p>Last modified: {new Date(entry.lastModDate).toLocaleString()}</p>
      <p>Raw data:</p>
      {rawData ? (
        <pre>
          <code className="text-break">{rawData}</code>
        </pre>
      ) : (
        <p>No raw data available</p>
      )}
    </div>
  );
}

export default Entry;
