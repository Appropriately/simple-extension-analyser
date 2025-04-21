import "../styles/tree.scss";

import { EntryTreeNode } from "../types/entry";
import Node from "./node";

function Tree({ rootNode }: { rootNode: EntryTreeNode }) {
  return (
    <>
      <nav className="tree">
        <Node node={rootNode} level={0} />
      </nav>
    </>
  );
}

export default Tree;
