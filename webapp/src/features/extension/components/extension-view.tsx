import { Extension } from "../types";

function ExtensionView({ extension }: { extension: Extension }) {
  return (
    <>
      {extension.manifest && (
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">Manifest</h5>
            <pre>{JSON.stringify(extension.manifest, null, 2)}</pre>
          </div>
        </div>
      )}
    </>
  );
}

export default ExtensionView;
