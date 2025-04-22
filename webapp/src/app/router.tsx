import { lazy, Suspense, useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import Loading from "@/components/loading";
import { updateTheme } from "@/features/extension/utils/theme";

import Layout from "./routes/layout";

const Home = lazy(() => import("./routes/home"));
const Extension = lazy(() => import("./routes/extension"));

function Router() {
  useEffect(() => {
    (function () {
      const htmlElement = document.querySelector("html");
      if (htmlElement && htmlElement.getAttribute("data-bs-theme") === "auto") {
        window
          .matchMedia("(prefers-color-scheme: dark)")
          .addEventListener("change", updateTheme);
        updateTheme();
      }
    })();
  });

  return (
    <HashRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/extension/:id" element={<Extension />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default Router;
