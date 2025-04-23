import { ChangeEvent } from "react";

import { useToasts } from "@/features/toasts";

import { Extension } from "../";
import { setupExtensionFromFile } from "../utils";

interface ExtensionSelectProps {
  cardClassName?: string;
  onUpdate?: (extension?: Extension) => void;
}

function ExtensionSelect({ cardClassName, onUpdate }: ExtensionSelectProps) {
  const toasts = useToasts();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      onUpdate?.(undefined);

      const validExtensions = [".zip", ".crx"];
      const fileExtension = file.name.slice(file.name.lastIndexOf("."));

      if (!validExtensions.includes(fileExtension)) {
        toasts.error(
          new Error(
            "Invalid file type. Please upload a browser extension file."
          )
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
        if (reader.error instanceof Error) toasts.error(reader.error);
      };

      try {
        const extension = await setupExtensionFromFile(file);
        onUpdate?.(extension);
      } catch (error) {
        if (error instanceof Error) toasts.error(error);

        console.error("Error setting up extension:", error);
        return;
      }
    }
  };

  return (
    <div className={`card mb-3${cardClassName ? " " + cardClassName : ""}`}>
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
        </div>
      </div>
    </div>
  );
}

export default ExtensionSelect;
