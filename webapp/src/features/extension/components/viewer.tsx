import { useEntryContext } from "../context/entry";
import { Extension } from "../utils/extension";
import Entry from "./entry";
import Tree from "./tree";

function Viewer({ extension }: { extension: Extension }) {
  const { entry, setEntry } = useEntryContext();

  return (
    <div className="row">
      {extension.entryTree && (
        <div className="col-md-4 col-lg-3 col-xl-2">
          <Tree rootNode={extension.entryTree} />
        </div>
      )}

      <div className="col-md-8 col-lg-9 col-xl-10">
        <nav aria-label="breadcrumb">
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

        {entry && <Entry entry={entry} />}
      </div>
    </div>
  );
}

export default Viewer;
