import { ReactNode, SelectHTMLAttributes } from "react";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
  className?: string;
}

function Select({ children, className, ...props }: Props) {
  return (
    <select
      className={`block w-full text-sm bg-zinc-100 dark:bg-zinc-700 border border-zinc-400 dark:border-zinc-700 placeholder-zinc-500 dark:placeholder-zinc-400 rounded-md p-2 pr-5 focus:outline-none focus:ring-2 focus:ring-blue-500 h-9 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500${className ? ` ${className}` : ""}`}
      {...props}
    >
      {children}
    </select>
  );
}

export default Select;
