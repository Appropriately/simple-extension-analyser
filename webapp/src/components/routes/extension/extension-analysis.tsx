import { useSelector } from "react-redux";

import { Extension } from "@/features/extension";
import { RootState } from "@/stores/store";

import Analysis from "./analysis/ai/analysis";
import Urls from "./analysis/urls";

interface Props {
  extension: Extension;
}

function ExtensionAnalysis({ extension }: Props) {
  const activeProvider = useSelector(({ ai }: RootState) =>
    ai.providers.find((p) => p.type === ai.activeProvider)
  );

  return (
    <>
      {activeProvider && <Analysis extension={extension} className="mb-2" />}
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
