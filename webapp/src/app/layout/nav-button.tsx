import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

function NavButton({ children, className, ...props }: Props) {
  return (
    <button
      type="button"
      className={`flex items-center gap-2 text-zinc-300 hover:bg-zinc-800 active:bg-zinc-700 vertical-align cursor-pointer text-left h-full ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default NavButton;
