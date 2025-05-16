import "../styles/markdown.css";

import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import PlaceholderText from "@/components/placeholder-text";

interface Props {
  stream: AsyncGenerator<string>;
  onError?: (error: Error) => void;
}

// StreamWriter is a component that streams content from an AsyncGenerator
// and displays it as it comes in.
function StreamWriter({ stream, onError }: Props) {
  const [raw, setRaw] = useState<string>("");

  useEffect(() => {
    const fetchStream = async () => {
      try {
        for await (const chunk of stream) {
          setRaw((prev) => prev + chunk);
        }
      } catch (error) {
        if (error instanceof Error && onError) onError(error);
      }
    };
    fetchStream();
  }, [stream, onError]);

  return (
    <>
      {!raw ? (
        <div className="flex gap-x-1 gap-y-2 flex-wrap">
          <PlaceholderText quantity={20} />
        </div>
      ) : (
        <div className="markdown">
          <Markdown remarkPlugins={[remarkGfm]}>{raw}</Markdown>
        </div>
      )}
    </>
  );
}

export default StreamWriter;
