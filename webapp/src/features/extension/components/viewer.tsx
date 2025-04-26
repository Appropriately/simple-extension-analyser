import { Fragment, MouseEvent, useEffect, useState } from "react";

import { buildEntryTree, Extension } from "../";
import { useEntryContext } from "../context";
import { EntryTreeFilters, EntryTreeNode, ExtendedEntry } from "../types";
import EntryView from "./entry-view";
import ExtensionView from "./extension-view";
import Tree from "./tree";
import TreeFilters from "./tree-filters";

function Viewer({ extension }: { extension: Extension }) {
  const { entry, setEntry } = useEntryContext();

  const [entryTree, setEntryTree] = useState<EntryTreeNode>();
  const [filters, setFilters] = useState<EntryTreeFilters>({});

  useEffect(() => {
    buildEntryTree(
      (extension.entries ?? []).filter(
        (entry) => !filters.term || entry.filename.toLowerCase().includes(filters.term.toLowerCase())
      )
    ).then((tree) => setEntryTree(tree));
  }, [extension.entries, filters]);

  const updateEntry = (e: MouseEvent, entry?: ExtendedEntry) => {
    e.preventDefault();
    setEntry(entry);
  };

  return (
    <div className="flex">
      <div className="w-64 flex-none h-[calc(100vh-4rem)]">
        <div className="p-2 h-12 border-b-1 border-zinc-700">
          <TreeFilters onChange={(filters) => setFilters(filters)} />
        </div>

        <div className="max-h-[calc(100vh-7rem)] overflow-y-auto overflow-x-hidden p-1">
          {entryTree && <Tree rootNode={entryTree} />}
        </div>
      </div>

      <div className="grow border-l-1 border-zinc-700 p-3 overflow-auto h-[calc(100vh-4rem)]">
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
