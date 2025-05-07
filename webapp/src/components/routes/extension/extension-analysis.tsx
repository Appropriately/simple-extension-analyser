import { Extension } from "@/features/extension";

import Urls from "./analysis/urls";

interface Props {
  extension: Extension;
}

function ExtensionAnalysis({ extension }: Props) {
  return (
    <>
      {
        <Urls
          urls={Object.values(extension.analysedFiles ?? {}).reduce(
            (acc, file) => {
              acc.push(...(file.urls ?? []));
              return acc;
            },
            [] as string[]
          )}
        />
      }
    </>
  );
}

export default ExtensionAnalysis;
