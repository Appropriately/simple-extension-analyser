import { useParams } from "react-router-dom";

import { EntryProvider, ExtensionViewer } from "@/features/extension";
import { store } from "@/stores";

function Extension() {
  const { id } = useParams();

  if (!id) return <div>Extension not found !</div>;

  // TODO: Look into useSelector instead of the getState approach.
  const extension = store.getState().extensions.extensions[id];
  if (!extension)
    return (
      <div>
        Extension not found !<br />
        <pre>
          {JSON.stringify(
            Object.keys(store.getState().extensions.extensions),
            null,
            2
          )}
        </pre>
      </div>
    );

  return (
    <EntryProvider>
      <div className="container-fluid">
        <ExtensionViewer extension={extension} />
      </div>
    </EntryProvider>
  );
}

export default Extension;
