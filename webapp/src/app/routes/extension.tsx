import { useParams } from "react-router-dom";

import { EntryProvider, ExtensionViewer } from "@/features/extension";
import { store } from "@/stores";

const ExtensionNotFound = ({ id }: { id?: string }) => {
  return (
    <div className="container py-3">
      <div className="text-center">
        <h3 className="m-0">Extension '{id}' not found!</h3>
      </div>
    </div>
  );
};

function Extension() {
  const { id } = useParams();

  if (!id) return ExtensionNotFound({ id });

  // TODO: Look into useSelector instead of the getState approach.
  const extension = store.getState().extensions.extensions[id];
  if (!extension) return ExtensionNotFound({ id });

  return (
    <EntryProvider>
      <div className="container-fluid">
        <ExtensionViewer extension={extension} />
      </div>
    </EntryProvider>
  );
}

export default Extension;
