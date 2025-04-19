import { EntryTreeNode } from "../types/entry";
import TreeNode from "./tree-node";

function EntryTree({ rootNode }: { rootNode: EntryTreeNode }) {
  return (
    <nav>
      <TreeNode node={rootNode} />
    </nav>
  );
}

export default EntryTree;
