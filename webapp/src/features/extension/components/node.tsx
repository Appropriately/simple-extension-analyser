import { useEntryContext } from "../context/entry";
import Icon from "@/components/icon";

import { EntryTreeNode, ExtendedEntry } from "../types/entry";
import Directory from "./directory";

interface NodeProps {
  node: EntryTreeNode;
  level: number;
}

function Node({ node, level }: NodeProps) {
  const { setEntry, entry } = useEntryContext();

  const entryToIcon = (entry: ExtendedEntry) => {
    const ext = entry.filename.split(".").pop();
    switch (ext) {
      case "json":
        return <Icon icon="filetype-json" className="me-2" />;
      case "js":
      case "ts":
      case "jsx":
      case "tsx":
      case "html":
      case "css":
      case "md":
      case "txt":
        return <Icon icon="file-earmark-code" className="me-2" />;
      case "png":
      case "jpg":
      case "jpeg":
      case "gif":
      case "svg":
        return <Icon icon="file-earmark-image" className="me-2" />;
    }

    return <Icon icon="file-earmark" className="me-2" />;
  };

  return (
    <ul aria-level={level}>
      {node.children.map((child) => (
        <Directory node={child} level={level} key={child.path} />
      ))}

      {node.entries.map((currentEntry) => (
        <li
          key={currentEntry.filename}
          aria-level={level}
          className={`${
            entry?.filename == currentEntry.filename ? "selected" : ""
          }`}
        >
          <button
            className="btn btn-link"
            onClick={() => setEntry(currentEntry)}
          >
            {entryToIcon(currentEntry)}
            <span>{currentEntry.filename.split("/").pop() ?? ""}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Node;
