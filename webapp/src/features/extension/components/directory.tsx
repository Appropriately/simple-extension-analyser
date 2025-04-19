import { useState } from "react";
import { EntryTreeNode } from "../types/entry";
import Node from "./node";

function Directory({ node }: { node: EntryTreeNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="directory" key={node.path}>
      <button onClick={() => setIsOpen(!isOpen)}>{node.name}</button>
      {isOpen && (node.children.length > 0 || node.entries.length > 0) && (
        <Node node={node} />
      )}
    </li>
  );
}

export default Directory;
