import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router-dom";

import Icon from "@/components/icon";

import Navbar from "./navbar";

const Layout = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Navbar>
        <Link to="/" className="flex items-center gap-2 p-4">
          <div className="">
            <Icon icon="search" className="text-blue-500" />
          </div>
          {t("base.name")}
        </Link>
      </Navbar>

      <main className="min-h-[calc(100vh-4rem)]">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
