import { lazy, Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import Loading from "@/components/loading";

import Layout from "./layout";

const Home = lazy(() => import("./routes/home"));
const Extension = lazy(() => import("./routes/extension"));
const Settings = lazy(() => import("./routes/settings"));
const NotFound = lazy(() => import("./routes/not-found"));

function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            index
            element={
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/extension/:id"
            element={
              <Suspense fallback={<Loading />}>
                <Extension />
              </Suspense>
            }
          />
          <Route
            path="/settings"
            element={
              <Suspense fallback={<Loading />}>
                <Settings />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<Loading />}>
                <NotFound />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default Router;
