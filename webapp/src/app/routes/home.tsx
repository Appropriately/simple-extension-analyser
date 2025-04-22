import { useState } from "react";

import {
  EntryProvider,
  Extension,
  ExtensionSelect,
  ExtensionViewer,
} from "@/features/extension";

function Home() {
  const [extension, setExtension] = useState<Extension>();

  return (
    <EntryProvider>
      <div className="container-fluid mb-3">
        <ExtensionSelect onUpdate={(extension) => setExtension(extension)} />

        {extension && (
          <div className="mx-3">
            <ExtensionViewer extension={extension} />
          </div>
        )}
      </div>
    </EntryProvider>
  );
}

export default Home;
