import { lazy, Suspense, useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import Layout from "./routes/layout";

const Home = lazy(() => import("./routes/home"));
const Extension = lazy(() => import("./routes/extension"));

function App() {
  useEffect(() => {
    (function () {
      const htmlElement = document.querySelector("html");
      if (htmlElement && htmlElement.getAttribute("data-bs-theme") === "auto") {
        function updateTheme() {
          if (htmlElement) {
            htmlElement.setAttribute(
              "data-bs-theme",
              window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light"
            );
          }
        }

        window
          .matchMedia("(prefers-color-scheme: dark)")
          .addEventListener("change", updateTheme);
        updateTheme();
      }
    })();
  });

  return (
    <HashRouter>
      <Suspense fallback={<div className="loading">Loading...</div>}>
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

export default App;
