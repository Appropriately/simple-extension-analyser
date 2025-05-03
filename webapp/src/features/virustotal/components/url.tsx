import Card from "@/components/card";
import Table, { TableColumn } from "@/components/table";

import { UrlAnalysis } from "../types";
import StatGraph from "./graphs/stat-graph";
import { STAT_TO_COLOUR } from "../utils";

const COLUMNS: TableColumn[] = [
  { label: "Name", key: "engine_name" },
  { label: "Method", key: "method", props: { style: { width: "100px" } } },
  { label: "Category", key: "category", props: { style: { width: "100px" } } },
  { label: "Result", key: "result", props: { style: { width: "150px" } } },
];

function Url({ analysis }: { analysis: UrlAnalysis }) {
  const { meta, data } = analysis;

  const stats = Object.entries(data.attributes.stats).map(([key, value]) => ({
    name: key[0].toUpperCase() + key.slice(1),
    value,
  }));

  const label = () => {
    if (data.attributes.stats.malicious > 0) return "malicious";
    if (data.attributes.stats.suspicious > 0) return "suspicious";
    if (data.attributes.stats.harmless > 0) return "harmless";
    return "undetected";
  };

  return (
    <>
      <h2 className="mb-2">{meta.url_info.url}</h2>

      <div className="flex gap-x-2">
        <Card className="w-48 h-64 !bg-zinc-800">
          <Card.Body>
            {Object.keys(data.attributes.stats).length > 0 && (
              <div className="flex items-center justify-center h-48 mb-1">
                <StatGraph stats={stats} />
              </div>
            )}
            <div
              className={`text-center font-bold capitalize text-lg ${
                STAT_TO_COLOUR[label()]
              }`}
            >
              {label()}
            </div>
          </Card.Body>
        </Card>

        <Card className="grow h-64 !bg-zinc-800">
          <Card.Body>
            <div className="overflow-y-auto h-60">
              <Table>
                <Table.Header
                  columns={COLUMNS}
                  className="border-b border-zinc-700 bg-zinc-800"
                />
                <Table.Body
                  data={
                    Object.values(data.attributes.results) as unknown as Record<
                      string,
                      unknown
                    >[]
                  }
                  columns={COLUMNS}
                />
              </Table>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default Url;
