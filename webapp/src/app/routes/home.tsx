import React, { useState } from "react";
import { Extension } from "@/features/extension/utils/extension";

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
      <div className="card">
        <div className="card-header">Browser Extension</div>
        <div className="card-body">
          <div className="row">
            <div className="col">
              <input
                type="file"
                id="fileInput"
                accept=".zip,.crx"
                onChange={handleFileChange}
              />
            </div>

            {extension && (
              <div className="col-auto">
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
                  className="btn btn-sm btn-secondary ms-2"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {extension && (
        <div>
          <hr />
          <h3>{extension.filename}</h3>
          <ul>
            {extension.entries().map((entry) => (
              <li key={entry.filename}>
                {entry.filename} {entry.directory ? "(directory)" : ""}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Home;
