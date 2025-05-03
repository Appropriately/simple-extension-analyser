import { Cell, Pie, PieChart, Tooltip, TooltipProps } from "recharts";

import { STAT_TO_FILL } from "../../utils";

export interface Stat {
  name: string;
  value: number;
}

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <div className="bg-zinc-700 py-1 px-2 text-sm rounded-sm shadow-md">
        <p className="text-zinc-200">{`${name}: ${value}`}</p>
      </div>
    );
  }

  return null;
};

function StatGraph({ stats }: { stats: Stat[] }) {
  const maliciousCount = Object.values(stats).reduce(
    (acc, stat) =>
      acc + (["malicious"].includes(stat.name.toLowerCase()) ? stat.value : 0),
    0
  );

  const totalCount = stats.reduce((acc, stat) => acc + stat.value, 0);

  return (
    <PieChart
      width={170}
      height={170}
      margin={{ top: -15, right: -15, left: -15, bottom: -15 }}
    >
      <Pie
        data={stats}
        nameKey="name"
        dataKey="value"
        innerRadius={60}
        paddingAngle={2}
      >
        {stats.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            className={`cursor-pointer ${
              STAT_TO_FILL[
                entry.name.toLowerCase() as keyof typeof STAT_TO_FILL
              ]
            }`}
            fill={undefined}
            stroke="#000"
            strokeWidth={0}
            strokeOpacity={0.2}
            fillOpacity={0.8}
            cx={100}
            cy={100}
          />
        ))}
      </Pie>
      <text
        x={85}
        y={80}
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-zinc-300 text-3xl font-bold"
      >
        {maliciousCount}
      </text>
      <text
        x={85}
        y={105}
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-zinc-400 text-sm"
      >
        / {totalCount}
      </text>
      <Tooltip content={<CustomTooltip />} />
    </PieChart>
  );
}

export default StatGraph;
