import { useTranslation } from "react-i18next";

import { FormGroup, InputDrop } from "@/components/ui";
import { useAnalyser } from "@/features/analyser";
import {
  setupExtensionFromFile,
  AnalysedFile,
  Extension,
} from "@/features/extension";
import { useToasts } from "@/features/toasts";

interface Props {
  onUpdate?: (extension?: Extension) => void;
}

function ExtensionSelect({ onUpdate }: Props) {
  const { error: toastError } = useToasts();
  const { analyseFile, initialiseByFile } = useAnalyser();
  const { t } = useTranslation();

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
        extension.id = await initialiseByFile(file);
        extension.analysedFiles = (await analyseFile(extension.id)) as Record<
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
    <FormGroup
      label={t("routes.home.extensions.extensionSelectLabel")}
      help={t("routes.home.extensions.extensionSelectHelp")}
    >
      <InputDrop accept=".zip,.crx" onFileChange={handleFileChange} />
    </FormGroup>
  );
}

export default ExtensionSelect;
