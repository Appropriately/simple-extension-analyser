import EntryView from "@/components/routes/extension/entry";
import ExtensionView from "@/components/routes/extension/extension";
import { EntryProvider, ExtensionViewer } from "@/features/extension";
import { store } from "@/stores";
import { createLazyFileRoute, useParams } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/extension/$id")({
  component: Extension,
});

const ExtensionNotFound = ({ id }: { id?: string }) => {
  return (
    <div className="container mx-auto pt-5">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Extension Not Found</h1>
        <p className="mt-2 text-lg text-zinc-400">
          The extension with ID '<strong>{id}</strong>' was not found.
        </p>
      </div>
    </div>
  );
};

function Extension() {
  const { id } = useParams({ from: "/extension/$id" });

  if (!id) return ExtensionNotFound({ id });

  // TODO: Look into useSelector instead of the getState approach.
  const extension = store.getState().extensions.extensions[id];
  if (!extension) return ExtensionNotFound({ id });

  return (
    <EntryProvider>
      <ExtensionViewer
        extension={extension}
        entryComponent={<EntryView extension={extension} />}
        extensionComponent={<ExtensionView extension={extension} />}
      />
    </EntryProvider>
  );
}

export default Extension;
