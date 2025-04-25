import { ChangeEvent } from "react";

import { useToasts } from "@/features/toasts";

import Card from "@/components/card";
import Input from "@/components/forms/input";

import { Extension } from "../";
import { setupExtensionFromFile } from "../utils";

interface ExtensionSelectProps {
  onUpdate?: (extension?: Extension) => void;
}

function ExtensionSelect({ onUpdate }: ExtensionSelectProps) {
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

      reader.onloadstart = () => console.log("File reading started...");

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

        event.target.value = "";
        console.error("Error setting up extension:", error);
        return;
      }
    }
  };

  return (
    <Card className="mb-3">
      <div>
        <label
          htmlFor="file_input"
          className="block mb-2 text-sm font-medium text-zinc-300"
        >
          Upload a browser extension file
        </label>
        <Input
          type="file"
          id="file_input"
          accept=".zip,.crx"
          onChange={handleFileChange}
          aria-describedby="file_input_help"
        />
        <p id="file_input_help" className="mt-2 text-sm text-zinc-400">
          Upload a .zip or .crx file containing the browser extension.
        </p>
      </div>
    </Card>
  );
}

export default ExtensionSelect;
