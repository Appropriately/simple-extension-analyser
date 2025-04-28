export interface TableColumn {
  label: string;
  key: string;
  width?: string;
  align?: "left" | "center" | "right";
}

interface Props {
  data: Record<string, unknown>[];
  columns: TableColumn[];
  skipHeader?: boolean;
  className?: string;
  headClassName?: string;
  bodyClassName?: string;
}

function Table({ data, columns, skipHeader, className, headClassName, bodyClassName }: Props) {
  return (
    <table className={`min-w-full ${className}`}>
      {!skipHeader && (
        <thead className={`sticky top-0 ${headClassName}`}>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="py-2 px-1 text-left text-xs font-medium uppercase tracking-wider text-zinc-300"
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
      <tbody className={`overflow-y-auto ${bodyClassName}`}>
        {data.map((item, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td
                key={column.key}
                className="py-2 px-1 whitespace-nowrap text-sm"
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
