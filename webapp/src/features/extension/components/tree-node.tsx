import { EntryTreeNode } from "../types/entry";

function TreeNode({ node }: { node: EntryTreeNode }) {
  return (
    <ul>
      {node.children.map((child) => (
        <li key={child.path}>
          <span>{child.name}</span>
          {(child.children.length > 0 || child.entries.length > 0) && (
            <TreeNode node={child} />
          )}
        </li>
      ))}

      {node.entries.map((entry) => (
        <li key={entry.filename}>
          <span>{entry.filename}</span>
        </li>
      ))}
    </ul>
  );
}

export default TreeNode;
