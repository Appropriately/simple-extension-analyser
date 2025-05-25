import { ReactNode } from "react";

function Navbar({ children }: { children: ReactNode }) {
  return (
    <nav className="z-20 h-14 w-full bg-zinc-400 bg-linear-to-r from-blue-400 to-blue-600 dark:from-zinc-950 dark:to-zinc-900 shadow-sm border-b border-zinc-700 dark:bg-zinc-900 dark:border-zinc-700">
      <div className="flex items-center justify-between max-w-screen-3xl mx-auto h-full">
        {children}
      </div>
    </nav>
  );
}

export default Navbar;
