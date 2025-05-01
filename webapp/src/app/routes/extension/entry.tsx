import { useEffect, useMemo, useState } from "react";

import Card from "@/components/card";
import CodeBlock from "@/components/code";
import Table from "@/components/table";
import Tabs, { Tab } from "@/components/tabs";
import { Extension, getEntryData } from "@/features/extension";
import { useEntryContext } from "@/features/extension/context";
import { useToasts } from "@/features/toasts";

import AnalysedEntry from "./analysed-entry";

const ALLOWED_EXTENSIONS = [".json", ".txt", ".md", ".js", ".html", ".css"];

// Map of common file extensions to their corresponding language identifiers.
// The code component will otherwise attempt to guess the language.
const FILE_EXTENSION_TO_LANGUAGE: Record<string, string> = {
  cs: "csharp",
  js: "javascript",
  kt: "kotlin",
  md: "markdown",
  pl: "perl",
  py: "python",
  rb: "ruby",
  rs: "rust",
};

const BASE_TABS: Tab[] = [
  { key: "details" },
  { key: "analysis", disabled: true },
];

interface Props {
  extension: Extension;
}

function EntryView({ extension }: Props) {
  const { entry } = useEntryContext();

  const { error: toastError } = useToasts();

  const [rawData, setRawData] = useState<string>();

  const [currentTab, setCurrentTab] = useState<string>(BASE_TABS[0].key);
  const [tabs, setTabs] = useState<Record<string, Tab>>(
    BASE_TABS.reduce((acc, tab) => {
      acc[tab.key] = tab;
      return acc;
    }, {} as Record<string, Tab>)
  );

  const tableItems = [
    { label: "Comment", value: entry?.comment },
    { label: "Encrypted", value: entry?.encrypted ? "Yes" : "No" },
    { label: "Compressed size", value: `${entry?.compressedSize} bytes` },
    { label: "Uncompressed size", value: `${entry?.uncompressedSize} bytes` },
    {
      label: "Last modified",
      value: new Date(entry?.lastModDate ?? 0).toLocaleString(),
    },
    ...Object.entries(entry?.extraField ?? {}).map(([key, value]) => ({
      label: key,
      value: Array.isArray(value) ? value.join(", ") : value,
    })),
  ];

  useEffect(() => {
    setCurrentTab(BASE_TABS[0].key);

    if (
      entry &&
      ALLOWED_EXTENSIONS.some((ext) => entry.filename.endsWith(ext))
    ) {
      if (!entry.getData) {
        // When serialised and retrieved, the getData method is lost.
        return;
      }

      try {
        setRawData(undefined);
        getEntryData(entry)
          .then((data) => setRawData(data ? data : undefined))
          .catch((error) => {
            if (error instanceof Error) toastError(error);
            setRawData(undefined);
          });
      } catch (error) {
        if (error instanceof Error) toastError(error);
        setRawData(undefined);
      }
    } else {
      setRawData(undefined);
    }
  }, [entry, toastError]);

  const analysedFile = useMemo(() => {
    if (entry) return extension.analysedFiles?.[entry.filename];
    return undefined;
  }, [entry, extension]);

  useEffect(() => {
    const newTabs = {
      ...BASE_TABS.reduce((acc, tab) => {
        acc[tab.key] = tab;
        return acc;
      }, {} as Record<string, Tab>),
    };

    if (analysedFile) newTabs["analysis"] = { key: "analysis" };
    if (rawData) newTabs["entry"] = { key: "entry" };

    setTabs(newTabs);
  }, [entry, rawData, analysedFile]);

  if (!entry) return <div className="text-zinc-300">No entry selected</div>;

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
          details: (
            <Card className="mb-3">
              <Card.Header>
                <h2 className="text-lg font-semibold">
                  {entry.filename.split("/").pop()}
                </h2>
              </Card.Header>
              <Card.Body>
                <Table>
                  <Table.Body
                    data={tableItems}
                    columns={[
                      { label: "Label", key: "label", width: "200px" },
                      { label: "Value", key: "value" },
                    ]}
                  />
                </Table>
              </Card.Body>
            </Card>
          ),
          analysis: <AnalysedEntry analysedFile={analysedFile!} />,
          entry: (
            <CodeBlock
              language={
                FILE_EXTENSION_TO_LANGUAGE[
                  entry.filename.split(".").pop()!.toLowerCase()
                ] ?? entry.filename.split(".").pop()
              }
              raw={rawData ?? ""}
            />
          ),
        }[currentTab]
      }
    </>
  );
}

export default EntryView;
