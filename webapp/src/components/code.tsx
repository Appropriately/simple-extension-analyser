import "@/styles/code.css";

import { Nodes, Root } from "hast";
import { createElement, ReactNode, useEffect, useRef, useState } from "react";

import lowlight from "@/lib/lowlight";
import { useToasts } from "@/features/toasts";

const OPTIONS = {
  prefix: "code-",
};

const CHUNK_SIZE = 10;

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
  const [renderedContent, setRenderedContent] = useState<ReactNode[]>([]);

  const nodesToRenderRef = useRef<Nodes[]>([]);
  const currentNodeIndexRef = useRef(0);
  const idleCallbackIdRef = useRef<number | null>(null);

  const { error: toastError } = useToasts();

  useEffect(() => {
    if (idleCallbackIdRef.current) {
      cancelIdleCallback(idleCallbackIdRef.current);
      idleCallbackIdRef.current = null;
    }

    setRenderedContent([]);
    currentNodeIndexRef.current = 0;
    nodesToRenderRef.current = [];

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
          idleCallbackIdRef.current = requestIdleCallback(processChunk);
        else idleCallbackIdRef.current = null;
      };

      idleCallbackIdRef.current = requestIdleCallback(processChunk);
    } else {
      setRenderedContent([]);
    }

    return () => {
      if (idleCallbackIdRef.current) {
        cancelIdleCallback(idleCallbackIdRef.current);
        idleCallbackIdRef.current = null;
      }
    };
  }, [raw, language, toastError]);

  return (
    <pre className="bg-black p-2 rounded text-xs overflow-x-auto min-h-[100px]">
      <code>{renderedContent}</code>
    </pre>
  );
}

export default CodeBlock;
