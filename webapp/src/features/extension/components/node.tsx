import { useEntryContext } from "@/features/extension/context/entry";

import { EntryTreeNode } from "../types/entry";
import Directory from "./directory";

function Node({ node }: { node: EntryTreeNode }) {
  const { setEntry, entry } = useEntryContext();

  return (
    <ul>
      {node.children.map((child) => (
        <Directory node={child} />
      ))}

      {node.entries.map((currentEntry) => (
        <li key={currentEntry.filename}>
          <button
            onClick={() => setEntry(currentEntry)}
            disabled={entry?.filename == currentEntry.filename}
          >
            {currentEntry.filename.split("/").pop() ?? ""}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Node;
