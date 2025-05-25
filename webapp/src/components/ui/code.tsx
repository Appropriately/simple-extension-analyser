import "@/styles/code.css";

import { Nodes, Root } from "hast";
import { createElement, ReactNode, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button, Card, Icon } from "@/components/ui";
import { useToasts } from "@/features/toasts";
import lowlight from "@/lib/lowlight";

const OPTIONS = {
  prefix: "code-",
};

const CHUNK_SIZE = 10;
const LARGE_FILE_THRESHOLD = 1000; // lines
const LARGE_FILE_SIZE_THRESHOLD = 10 * 1024; // 10KB

interface Props {
  raw: string;
  language?: string;
}

const renderNodeToReact = (node: Nodes, path: string): ReactNode => {
  const key = path; // Use the generated path as the key

  if (node.type === "element") {
    const { tagName, properties, children } = node;

    const elementProps: Record<string, unknown> & { key: string } = { key };
    for (const prop in properties) {
      if (Object.prototype.hasOwnProperty.call(properties, prop)) {
        const value = properties[prop as keyof typeof properties];
        if (prop === "className" && Array.isArray(value))
          elementProps[prop] = value.join(" ");
        else if (prop !== "key") elementProps[prop] = value;
      }
    }

    const renderedChildren = children.map((child, index) =>
      renderNodeToReact(child, `${path}-${index}`)
    );

    return createElement(tagName, elementProps, renderedChildren);
  }

  if (node.type === "text") return node.value;
  if (node.type === "root")
    return node.children.map((child, index) =>
      renderNodeToReact(child, `${path}-${index}`)
    );

  return null;
};

function CodeBlock({ raw, language }: Props) {
  const { t } = useTranslation();
  const { error: toastError } = useToasts();

  const [renderedContent, setRenderedContent] = useState<ReactNode[]>([]);
  const [lineCount, setLineCount] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [isRendering, setIsRendering] = useState(false);

  const nodesToRenderRef = useRef<Nodes[]>([]);
  const currentNodeIndexRef = useRef(0);
  const idleCallbackIdRef = useRef<number | null>(null);

  const requestIdleCallbackFunc = window.requestIdleCallback ?? setTimeout;
  const cancelIdleCallbackFunc = window.cancelIdleCallback ?? clearTimeout;

  useEffect(() => {
    if (idleCallbackIdRef.current) {
      cancelIdleCallback(idleCallbackIdRef.current);
      idleCallbackIdRef.current = null;
    }

    setRenderedContent([]);
    currentNodeIndexRef.current = 0;
    nodesToRenderRef.current = [];

    // Count lines in the raw text
    const lines = raw.split("\n");
    setLineCount(lines.length);

    // Check if file is large
    const isLargeFile =
      lines.length > LARGE_FILE_THRESHOLD ||
      new Blob([raw]).size > LARGE_FILE_SIZE_THRESHOLD;

    if (isLargeFile && !isRendering) {
      setShowWarning(true);
      return;
    }

    setShowWarning(false);
    setIsRendering(true);

    let root: Root | null = null;
    try {
      root =
        language && lowlight.listLanguages().includes(language)
          ? lowlight.highlight(language, raw, OPTIONS)
          : lowlight.highlightAuto(raw, OPTIONS);
    } catch (error) {
      if (error instanceof Error) toastError(error);
      else toastError(new Error("Failed to highlight code"));

      setRenderedContent([raw]);
      return;
    }

    if (root && root.children && root.children.length > 0) {
      nodesToRenderRef.current = root.children;

      const processChunk = (deadline?: IdleDeadline) => {
        const timeRemaining = () => deadline?.timeRemaining() ?? Infinity;

        while (
          timeRemaining() > 1 &&
          currentNodeIndexRef.current < nodesToRenderRef.current.length
        ) {
          const processUpToIndex = Math.min(
            currentNodeIndexRef.current + CHUNK_SIZE,
            nodesToRenderRef.current.length
          );
          const startIndex = currentNodeIndexRef.current;

          if (startIndex >= processUpToIndex) break;

          const chunkNodes = nodesToRenderRef.current.slice(
            startIndex,
            processUpToIndex
          );

          const newElements = chunkNodes.map((node, chunkIndex) => {
            const absoluteIndex = startIndex + chunkIndex;
            return renderNodeToReact(node, `node-${absoluteIndex}`);
          });

          setRenderedContent((prev) => [...prev, ...newElements]);

          currentNodeIndexRef.current = processUpToIndex;

          if (
            deadline &&
            timeRemaining() <= 1 &&
            currentNodeIndexRef.current < nodesToRenderRef.current.length
          ) {
            break;
          }
        }

        if (currentNodeIndexRef.current < nodesToRenderRef.current.length)
          idleCallbackIdRef.current = requestIdleCallbackFunc(processChunk);
        else idleCallbackIdRef.current = null;
      };

      idleCallbackIdRef.current = requestIdleCallbackFunc(processChunk);
    } else {
      setRenderedContent([]);
    }

    return () => {
      if (idleCallbackIdRef.current) {
        cancelIdleCallbackFunc(idleCallbackIdRef.current);
        idleCallbackIdRef.current = null;
      }
    };
  }, [
    raw,
    language,
    toastError,
    isRendering,
    requestIdleCallbackFunc,
    cancelIdleCallbackFunc,
  ]);

  if (showWarning) {
    return (
      <Card>
        <Card.Header className="flex items-center">
          <Icon
            icon="exclamation-warning"
            className="fill-yellow-400 mr-2 inline-block"
          />
          {t("components.code.largeFileWarning.title")}
        </Card.Header>
        <Card.Body>
          <p className="text-zinc-400">
            {t("components.code.largeFileWarning.description", {
              lineCount: lineCount.toLocaleString(),
            })}
          </p>
        </Card.Body>
        <Card.Footer>
          <Button
            onClick={() => setIsRendering(true)}
            className="bg-yellow-600! hover:bg-yellow-700!"
          >
            {t("components.code.largeFileWarning.renderAnyway")}
          </Button>
        </Card.Footer>
      </Card>
    );
  }

  return (
    <div className="code-block relative">
      <pre className="bg-black p-2 rounded text-xs overflow-x-auto min-h-[100px]">
        <div className="flex">
          <div className="select-none text-zinc-600 pr-2 mr-2 border-r border-zinc-800 text-right">
            {Array.from({ length: lineCount }, (_, i) => (
              <div key={i} className="h-4 leading-4">
                {i + 1}
              </div>
            ))}
          </div>
          <code className="flex-1">{renderedContent}</code>
        </div>
      </pre>
    </div>
  );
}

export default CodeBlock;
