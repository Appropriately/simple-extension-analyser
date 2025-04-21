import { useState } from "react";

import Icon from "@/components/icon";

import { EntryTreeNode } from "../types/entry";
import Node from "./node";

interface DirectoryProps {
  node: EntryTreeNode;
  level: number;
}

function Directory({ node, level }: DirectoryProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className={`directory${isOpen ? " open" : ""}`} key={node.path}>
      <button className="btn btn-link" onClick={() => setIsOpen(!isOpen)}>
        <Icon icon={isOpen ? "folder-minus" : "folder-plus"} className="me-2" />
        <span>{node.name}</span>
      </button>
      {isOpen && (node.children.length > 0 || node.entries.length > 0) && (
        <Node node={node} level={level + 1} />
      )}
    </li>
  );
}

export default Directory;
