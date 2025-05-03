import { useEffect, useMemo, useState } from "react";

import CodeBlock from "@/components/code";
import Tabs, { Tab } from "@/components/tabs";
import { Extension } from "@/features/extension";

import ExtensionAnalysis from "./extension-analysis";

const BASE_TABS: Tab[] = [
  { key: "routes.extension.extension.manifest" },
  { key: "routes.extension.extension.analysis" },
];

interface Props {
  extension: Extension;
}

function ExtensionView({ extension }: Props) {
  const [currentTab, setCurrentTab] = useState<string>(BASE_TABS[0].key);

  const tabs = useMemo(
    () =>
      BASE_TABS.reduce((acc, tab) => {
        acc[tab.key] = tab;
        return acc;
      }, {} as Record<string, Tab>),
    []
  );

  useEffect(() => {
    setCurrentTab(BASE_TABS[0].key);
  }, [extension]);

  return (
    <>
      <Tabs
        tabs={Object.values(tabs)}
        className="mb-3"
        value={currentTab}
        setValue={setCurrentTab}
      />

      {
        {
          "routes.extension.extension.manifest": (
            <CodeBlock raw={JSON.stringify(extension.manifest, null, 2)} />
          ),
          "routes.extension.extension.analysis": (
            <ExtensionAnalysis extension={extension} />
          ),
        }[currentTab]
      }
    </>
  );
}

export default ExtensionView;
