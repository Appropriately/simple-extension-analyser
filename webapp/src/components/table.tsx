import { HTMLAttributes, ReactNode } from "react";

export interface TableColumn {
  label: string;
  key: string;
  props?: HTMLAttributes<HTMLTableCellElement>;
  render?: (value: unknown, item: Record<string, unknown>) => ReactNode;
}

interface Props {
  className?: string;
}

interface TableHeaderProps extends Props {
  columns: TableColumn[];
}

function TableHeader({ columns, className }: TableHeaderProps) {
  return (
    <thead className={`sticky top-0 ${className}`}>
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            className="py-2 px-1 text-left text-xs font-medium uppercase tracking-wider text-zinc-300"
            {...column.props}
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}

interface TableBodyProps extends Props {
  data: Record<string, unknown>[];
  columns: TableColumn[];
}

function TableBody({ data, columns, className }: TableBodyProps) {
  return (
    <tbody className={`overflow-y-auto ${className}`}>
      {data.map((item, index) => (
        <tr key={index}>
          {columns.map((column) => (
            <td
              key={column.key}
              className="py-2 px-1 text-sm align-top"
              {...column.props}
            >
              {column.render
                ? column.render(item[column.key], item)
                : String(item[column.key])}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

interface TableProps extends Props {
  children?: ReactNode;
}

function Table({ className, children }: TableProps) {
  return <table className={`min-w-full ${className}`}>{children}</table>;
}

Table.Header = TableHeader;
Table.Body = TableBody;

export default Table;
