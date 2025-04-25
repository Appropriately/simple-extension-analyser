import { lazy, Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import Loading from "@/components/loading";

import Layout from "./layout";

const Home = lazy(() => import("./routes/home"));
const Extension = lazy(() => import("./routes/extension"));

function Router() {
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
