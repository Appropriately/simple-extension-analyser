import Card from "@/components/card";
import InputDrop from "@/components/forms/input-drop";
import { useAnalyser } from "@/features/analyser/contexts";
import { AnalysedFile, Extension } from "@/features/extension/types";
import { setupExtensionFromFile } from "@/features/extension/utils";
import { useToasts } from "@/features/toasts";

interface ExtensionSelectProps {
  onUpdate?: (extension?: Extension) => void;
}

function ExtensionSelect({ onUpdate }: ExtensionSelectProps) {
  const { error: toastError } = useToasts();
  const { analyseFile } = useAnalyser();

  const handleFileChange = async (file?: File) => {
    if (file) {
      onUpdate?.(undefined);

      const validExtensions = [".zip", ".crx"];
      const fileExtension = file.name.slice(file.name.lastIndexOf("."));

      if (!validExtensions.includes(fileExtension)) {
        toastError(
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
        if (reader.error instanceof Error) toastError(reader.error);
      };

      try {
        const extension = await setupExtensionFromFile(file);
        extension.analysedFiles = (await analyseFile(file)) as Record<
          string,
          AnalysedFile
        >;
        onUpdate?.(extension);
      } catch (error) {
        if (error instanceof Error) toastError(error);

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

        <InputDrop
          id="file_input"
          accept=".zip,.crx"
          onFileChange={handleFileChange}
          aria-describedby="file_input_help"
          className="mb-2"
        />

        <p id="file_input_help" className="text-sm text-zinc-400">
          Upload a .zip or .crx file containing the browser extension.
        </p>
      </div>
    </Card>
  );
}

export default ExtensionSelect;
