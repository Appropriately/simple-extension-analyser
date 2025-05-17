import { Fragment, MouseEvent, ReactNode, useEffect, useState } from "react";

import { buildEntryTree, Extension } from "../";
import { useEntryContext } from "../context";
import { EntryTreeFilters, EntryTreeNode, ExtendedEntry } from "../types";
import Tree from "./tree";
import TreeFilters from "./tree-filters";

interface Props {
  extension: Extension;
  extensionComponent: ReactNode;
  entryComponent: ReactNode;
}

function Viewer({ extension, extensionComponent, entryComponent }: Props) {
  const { entry, setEntry } = useEntryContext();

  const [entryTree, setEntryTree] = useState<EntryTreeNode>();
  const [filters, setFilters] = useState<EntryTreeFilters>({});

  useEffect(() => {
    buildEntryTree(
      (extension.entries ?? []).filter(
        (entry) =>
          !filters.term ||
          entry.filename.toLowerCase().includes(filters.term.toLowerCase())
      )
    ).then((tree) => setEntryTree(tree));
  }, [extension.entries, filters]);

  const updateEntry = (e: MouseEvent, entry?: ExtendedEntry) => {
    e.preventDefault();
    setEntry(entry);
  };

  return (
    <div className="flex">
      <div className="w-64 flex-none h-[calc(100vh-3.5rem)] flex flex-col">
        <div className="p-2 border-b-1 border-zinc-700">
          <TreeFilters onChange={(filters) => setFilters(filters)} />
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden p-1">
          {entryTree && <Tree rootNode={entryTree} />}
        </div>
      </div>

      <div className="grow border-l-1 border-zinc-700 p-2 overflow-auto h-[calc(100vh-3.5rem)]">
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

        {entry ? entryComponent : extensionComponent}
      </div>
    </div>
  );
}

export default Viewer;
