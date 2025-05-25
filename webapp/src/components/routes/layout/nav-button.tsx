import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}
function NavButton({ children, className, ...props }: Props) {
  return (
    <button
      className={`flex items-center gap-2 hover:text-zinc-200 active:text-zinc-300 hover:bg-blue-500 dark:hover:bg-zinc-800 active:bg-blue-600 dark:active:bg-zinc-700 vertical-align cursor-pointer text-left h-full ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default NavButton;
