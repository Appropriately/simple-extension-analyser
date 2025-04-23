import "@/styles/code.scss";

import { Nodes } from "hast";
import { createElement, ReactNode } from "react";

import lowlight from "@/lib/lowlight";

const OPTIONS = {
  prefix: "code-",
};

interface CodeBlockProps {
  raw: string;
  language?: string;
}

function CodeBlock({ raw, language }: CodeBlockProps) {
  const tree =
    language && lowlight.listLanguages().includes(language)
      ? lowlight.highlight(language, String(raw), OPTIONS)
      : lowlight.highlightAuto(String(raw), OPTIONS);

  const render = (content: Nodes | Nodes[]): ReactNode => {
    return (Array.isArray(content) ? content : [content]).map((node, index) => {
      if (node.type === "element") {
        const { tagName, properties, children } = node;
        const props = { ...properties, key: index };
        return createElement(tagName, props, render(children));
      }

      if (node.type === "text") return node.value;
      return null;
    });
  };

  return (
    <pre className={`bg-secondary-subtle p-2 rounded`}>
      <code>{render(tree.children)}</code>
    </pre>
  );
}

export default CodeBlock;
