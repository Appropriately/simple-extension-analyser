import { HTMLAttributes, ReactNode } from "react";

export interface TableColumn<T = unknown> {
  label: string;
  key: keyof T | string;
  props?: HTMLAttributes<HTMLTableCellElement>;
  className?: string;
  render?: (value: T[keyof T], item: T) => ReactNode;
}

interface Props {
  className?: string;
}

interface TableColumnProps<T = unknown> {
  columns: TableColumn<T>[];
}

interface TableHeaderProps<T = unknown> extends Props, TableColumnProps<T> {}

function TableHeader<T>({ columns, className }: TableHeaderProps<T>) {
  return (
    <thead className={`sticky top-0 ${className}`}>
      <tr>
        {columns.map((column) => (
          <th
            key={String(column.key)}
            className={`py-2 px-1 text-left text-xs font-medium uppercase tracking-wider text-zinc-300${column.className ? ` ${column.className}` : ""}`}
            {...column.props}
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}

interface TableBodyProps<T = unknown> extends Props, TableColumnProps<T> {
  data: T[];
}

function TableBody<T>({ data, columns, className }: TableBodyProps<T>) {
  return (
    <tbody className={`overflow-y-auto ${className}`}>
      {data.map((item, index) => (
        <tr key={index}>
          {columns.map((column) => (
            <td
              key={String(column.key)}
              className={`py-2 px-1 text-sm${column.className ? ` ${column.className}` : ""}`}
              {...column.props}
            >
              {column.render
                ? column.render(item[column.key as keyof T], item)
                : String(item[column.key as keyof T])}
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
