import { useTranslation } from "react-i18next";

import Error from "@/components/routes/error";
import NavButton from "@/components/routes/layout/nav-button";
import Navbar from "@/components/routes/layout/navbar";
import NotFound from "@/components/routes/not-found";
import { Icon } from "@/components/ui";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: Layout,
  notFoundComponent: NotFound,
  errorComponent: Error,
});

function Layout() {
  const { t } = useTranslation();

  return (
    <>
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

        <NavButton className="ms-auto">
          <a
            href="https://github.com/Appropriately/simple-extension-analyser"
            target="_blank"
            className="flex items-center justify-center w-full h-full px-4"
          >
            <Icon icon="github" height={25} width={25} />
          </a>
        </NavButton>
        <NavButton>
          <Link
            to="/settings"
            className="flex items-center justify-center w-full h-full px-4"
          >
            <Icon icon="gear" height={25} width={25} />
          </Link>
        </NavButton>
      </Navbar>

      <main className="min-h-[calc(100vh-3.5rem)]">
        <Outlet />
      </main>
    </>
  );
}
