interface TableColumn {
  label: string;
  key: string;
  width?: string;
  align?: "left" | "center" | "right";
}

interface TableProps {
  data: Record<string, unknown>[];
  columns: TableColumn[];
  skipHeader?: boolean;
}

function Table({ data, columns, skipHeader }: TableProps) {
  return (
    <table className="min-w-full">
      {!skipHeader && (
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="p-1 text-left text-xs font-medium uppercase tracking-wider text-zinc-300"
                style={{
                  width: column.width,
                  textAlign: column.align || "left",
                }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td
                key={column.key}
                className="p-1 whitespace-nowrap text-sm"
                style={{
                  width: column.width,
                  textAlign: column.align || "left",
                }}
              >
                {String(item[column.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
