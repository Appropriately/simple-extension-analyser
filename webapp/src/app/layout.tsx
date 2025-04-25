import { Outlet, Link } from "react-router-dom";
import Icon from "@/components/icon";

const Layout = () => {
  return (
    <div>
      <nav className="w-full bg-linear-to-r from-zinc-950 to-zinc-800 shadow-sm border-b border-zinc-700">
        <div className="flex items-center justify-between max-w-screen-3xl mx-auto h-full">
          <Link to="/" className="flex items-center gap-2 p-4">
            <div className="">
              <Icon icon="search" className="text-blue-500" />
            </div>
            Simple Extension Analyser
          </Link>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
