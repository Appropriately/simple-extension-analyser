import { HTMLAttributes, ReactNode } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}
function NavButton({ children, className, ...props }: Props) {
  return (
    <div
      className={`flex items-center gap-2 text-zinc-300 hover:text-zinc-200 active:text-zinc-100 hover:bg-zinc-800 active:bg-zinc-700 vertical-align cursor-pointer text-left h-full ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default NavButton;
