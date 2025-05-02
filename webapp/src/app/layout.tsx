import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router-dom";

import Icon from "@/components/icon";

import Navbar from "./layout/navbar";
import NavButton from "./layout/nav-button";

const Layout = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Navbar>
        <NavButton>
          <Link to="/" className="flex items-center gap-2 p-4">
            <Icon
              icon="search"
              className="text-blue-500"
              height={18}
              width={18}
            />
            {t("base.name")}
          </Link>
        </NavButton>

        <NavButton
          className="ms-auto px-5"
          onClick={() =>
            window.open(
              "https://github.com/Appropriately/simple-extension-analyser",
              "_blank"
            )
          }
        >
          <Icon icon="github" height={25} width={25} />
        </NavButton>
        <NavButton className="px-5">
          <Link to="/settings">
            <Icon icon="gear" height={25} width={25} />
          </Link>
        </NavButton>
      </Navbar>

      <main className="min-h-[calc(100vh-4rem)]">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
