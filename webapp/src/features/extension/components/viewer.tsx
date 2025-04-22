import "../styles/viewer.scss";

import { useEntryContext } from "../context/entry";
import { Extension } from "../utils/extension";
import EntryView from "./entry-view";
import ExtensionView from "./extension-view";
import Tree from "./tree";

function Viewer({ extension }: { extension: Extension }) {
  const { entry, setEntry } = useEntryContext();

  return (
    <div className="row vh-100">
      {extension.entryTree && (
        <div
          className="col-md-4 col-lg-3 col-xl-2 py-1 border-end scrollable-max-height"
        >
          <Tree rootNode={extension.entryTree} />
        </div>
      )}

      <div
        className="col-md-8 col-lg-9 col-xl-10 scrollable-max-height"
      >
        <nav className="my-3" aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              {entry ? (
                <a href="#" onClick={() => setEntry(undefined)}>
                  {extension.filename}
                </a>
              ) : (
                <span>{extension.filename}</span>
              )}
            </li>
            {entry?.filename.split("/").map((part, index) => (
              <li key={index} className="breadcrumb-item">
                <span className="text-muted">{part}</span>
              </li>
            ))}
          </ol>
        </nav>

        {entry ? (
          <EntryView entry={entry} />
        ) : (
          <ExtensionView extension={extension} />
        )}
      </div>
    </div>
  );
}

export default Viewer;
