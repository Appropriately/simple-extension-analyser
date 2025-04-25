import { EntryTreeNode } from "../types";
import Node from "./node";

interface Props {
  rootNode: EntryTreeNode;
  className?: string;
}

function Tree({ rootNode, className }: Props) {
  return (
    <nav className={className}>
      <Node node={rootNode} level={0} />
    </nav>
  );
}

export default Tree;
