import { useEntryContext } from "../context";
import { EntryTreeNode, ExtendedEntry } from "../types";
import Directory from "./directory";
import TreeButton from "./tree-button";

interface Props {
  node: EntryTreeNode;
  level: number;
}

function Node({ node, level }: Props) {
  const { entry, setEntry } = useEntryContext();

  const entryToIcon = (entry: ExtendedEntry) => {
    const ext = entry.filename.split(".").pop();
    switch (ext) {
      case "json":
        return "filetype-json";
      case "js":
        return "filetype-js";
      case "ts":
      case "jsx":
      case "tsx":
      case "html":
      case "css":
      case "md":
      case "txt":
        return "file-earmark-code";
      case "png":
      case "jpg":
      case "jpeg":
      case "gif":
      case "svg":
        return "file-earmark-image";
    }

    return "file-earmark";
  };

  return (
    <ul
      className="ms-1 [&:not(:first-child)]:border-l-1 border-zinc-700 !list-none !pl-0"
      aria-level={level}
    >
      {node.children.map((child) => (
        <Directory node={child} level={level} key={child.path} />
      ))}

      {node.entries.map((currentEntry) => (
        <li key={currentEntry.filename} aria-level={level}>
          <TreeButton
            icon={entryToIcon(currentEntry)}
            onClick={() => setEntry(currentEntry)}
            aria-selected={entry?.filename === currentEntry.filename}
          >
            <span>{currentEntry.filename.split("/").pop() ?? ""}</span>
          </TreeButton>
        </li>
      ))}
    </ul>
  );
}

export default Node;
