import { useEntryContext } from "../context/entry";
import { Extension } from "../utils/extension";
import Entry from "./entry";
import Tree from "./tree";

function Viewer({ extension }: { extension: Extension }) {
  const { entry } = useEntryContext();

  return (
    <div className="row">
      {extension.entryTree && (
        <div className="col-auto">
          <Tree rootNode={extension.entryTree} />
        </div>
      )}

      {entry && (
        <div className="col">
          <Entry entry={entry} />
        </div>
      )}
    </div>
  );
}

export default Viewer;
