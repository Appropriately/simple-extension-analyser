import { ChangeEvent, useState } from "react";

import EntryProvider from "@/features/extension/components/entry-provider";
import Viewer from "@/features/extension/components/viewer";
import { Extension } from "@/features/extension/utils/extension";
import { useToasts } from "@/features/toasts/hooks/toasts";

function Home() {
  const [extension, setExtension] = useState<Extension>();
  const toasts = useToasts();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setExtension(undefined);

      const validExtensions = [".zip", ".crx"];
      const fileExtension = file.name.slice(file.name.lastIndexOf("."));

      if (!validExtensions.includes(fileExtension)) {
        toasts.error(new Error("Invalid file type. Please upload a browser extension file."));
        return;
      }

      const reader = new FileReader();
      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          console.log(`Progress: ${(e.loaded / e.total) * 100}%`);
        }
      };

      reader.onloadstart = () => {
        console.log("File reading started...");
      };

      reader.onload = () => {
        console.log("File reading completed.");
        console.log("File content:", reader.result);
      };

      reader.onerror = () => {
        if (reader.error instanceof Error) toasts.error(reader.error);
      };

      const extension = new Extension();

      try {
        await extension.setupFromFile(file);
      } catch (error) {
        if (error instanceof Error) toasts.error(error);

        console.error("Error setting up extension:", error);
        return;
      }

      setExtension(extension);
    }
  };

  return (
    <EntryProvider>
      <div className="container-fluid">
        <div className="card mb-3">
          <div className="card-header">Browser Extension</div>
          <div className="card-body">
            <div className="input-group">
              <label className="input-group-text" htmlFor="inputGroupFile01">
                Upload
              </label>
              <input
                type="file"
                id="fileInput"
                accept=".zip,.crx"
                className="form-control"
                onChange={handleFileChange}
              />
              {extension && (
                <button
                  onClick={() => {
                    const fileInput = document.getElementById(
                      "fileInput"
                    ) as HTMLInputElement;
                    if (fileInput) {
                      fileInput.value = "";
                      setExtension(undefined);
                    }
                  }}
                  className="btn btn-outline-secondary"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {extension && (
            <div className="mx-3">
              <Viewer extension={extension} />
            </div>
          )}
        </div>
      </div>
    </EntryProvider>
  );
}

export default Home;
