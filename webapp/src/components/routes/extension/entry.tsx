import { useEffect, useMemo, useState } from "react";

import { Card, CodeBlock, Tab, Table, Tabs } from "@/components/ui";
import { Extension, getEntryData, useEntryContext } from "@/features/extension";
import { useToasts } from "@/features/toasts";

import EntryAnalysis from "./entry-analysis";

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
  { key: "routes.extension.entry.details" },
  { key: "routes.extension.entry.analysis", disabled: true },
];

interface Props {
  extension: Extension;
}

function EntryView({ extension }: Props) {
  const { entry } = useEntryContext();

  const { error: toastError } = useToasts();

  const [rawData, setRawData] = useState<string>();

  const [currentTab, setCurrentTab] = useState<string>(BASE_TABS[0].key);

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

  const tabs = useMemo(() => {
    const newTabs = {
      ...BASE_TABS.reduce(
        (acc, tab) => {
          acc[tab.key] = tab;
          return acc;
        },
        {} as Record<string, Tab>
      ),
    };

    if (analysedFile)
      newTabs["routes.extension.entry.analysis"] = {
        key: "routes.extension.entry.analysis",
      };
    if (rawData)
      newTabs["routes.extension.entry.entry"] = {
        key: "routes.extension.entry.entry",
      };

    return newTabs;
  }, [rawData, analysedFile]);

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
          "routes.extension.entry.details": (
            <Card className="mb-3">
              <Card.Body>
                <Table>
                  <Table.Body
                    data={tableItems}
                    columns={[
                      {
                        label: "Label",
                        key: "label",
                        props: { style: { width: "200px" } },
                      },
                      { label: "Value", key: "value" },
                    ]}
                  />
                </Table>
              </Card.Body>
            </Card>
          ),
          "routes.extension.entry.analysis": (
            <div>
              {analysedFile && <EntryAnalysis analysedFile={analysedFile} />}
            </div>
          ),
          "routes.extension.entry.entry": (
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
