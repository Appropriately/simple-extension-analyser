import { MouseEvent, Fragment } from "react";

import { Extension } from "../";
import { useEntryContext } from "../context/entry";
import { ExtendedEntry } from "../types/entry";
import EntryView from "./entry-view";
import ExtensionView from "./extension-view";
import Tree from "./tree";

function Viewer({ extension }: { extension: Extension }) {
  const { entry, setEntry } = useEntryContext();

  const updateEntry = (e: MouseEvent, entry?: ExtendedEntry) => {
    e.preventDefault();
    setEntry(entry);
  };

  return (
    <div className="flex">
      {extension.entryTree && (
        <div className="w-64 flex-none p-2 overflow-y-auto overflow-x-hidden max-h-screen">
          <Tree rootNode={extension.entryTree} />
        </div>
      )}

      <div className="grow border-l-1 border-zinc-700 p-3 overflow-auto max-h-screen">
        <nav className="mb-3">
          <ol className="flex items-center gap-x-2">
            <li>
              {entry ? (
                <a
                  href="#"
                  onClick={(e) => updateEntry(e, undefined)}
                  className="text-blue-400 hover:underline"
                >
                  {extension.filename}
                </a>
              ) : (
                <span className="text-zinc-300">{extension.filename}</span>
              )}
            </li>
            {entry &&
              entry?.filename.split("/").map((part, index) => (
                <Fragment key={index}>
                  <li className="text-zinc-500">/</li>
                  <li>
                    <span className="text-zinc-300">{part}</span>
                  </li>
                </Fragment>
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
