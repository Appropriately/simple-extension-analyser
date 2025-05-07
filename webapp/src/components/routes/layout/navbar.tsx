import { ReactNode } from "react";

function Navbar({ children }: { children: ReactNode }) {
  return (
    <nav className="z-20 h-16 w-full bg-zinc-900 bg-linear-to-r from-zinc-950 to-zinc-900 shadow-sm border-b border-zinc-700">
      <div className="flex items-center justify-between max-w-screen-3xl mx-auto h-full">
        {children}
      </div>
    </nav>
  );
}

export default Navbar;
