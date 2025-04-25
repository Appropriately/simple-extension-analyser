import { useState } from "react";

import { EntryTreeNode } from "../types";
import Node from "./node";
import TreeButton from "./tree-button";

interface DirectoryProps {
  node: EntryTreeNode;
  level: number;
}

function Directory({ node, level }: DirectoryProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li key={node.path}>
      <TreeButton
        icon={isOpen ? "folder-minus" : "folder-plus"}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{node.name}</span>
      </TreeButton>

      {isOpen && (node.children.length > 0 || node.entries.length > 0) && (
        <Node node={node} level={level + 1} />
      )}
    </li>
  );
}

export default Directory;
