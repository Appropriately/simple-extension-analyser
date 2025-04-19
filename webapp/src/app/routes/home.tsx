import React, { useState } from "react";
import { Extension } from "@/features/extension/utils/extension";
import EntryTree from "@/features/extension/components/entry-tree";

function Home() {
  const [extension, setExtension] = useState<Extension>();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const validExtensions = [".zip", ".crx"];
      const fileExtension = file.name.slice(file.name.lastIndexOf("."));

      if (!validExtensions.includes(fileExtension)) {
        console.error(
          "Invalid file type. Please upload a browser extension file."
        );
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
        console.error("Error reading file:", reader.error);
      };

      const extension = new Extension();
      await extension.setupFromFile(file);

      setExtension(extension);
    }
  };

  return (
    <div className="container">
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
          <div className="card-footer">
            <p>File Name: {extension.filename}</p>

            {extension.entryTree && (
              <EntryTree rootNode={extension.entryTree} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
