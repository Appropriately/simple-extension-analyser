import "@/lib/i18n";
import "@/styles/main.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import AnalyserProvider from "@/features/analyser/components/analyser-provider";
import { ToastsProvider } from "@/features/toasts";
import { store } from "@/stores";
import {
  createHashHistory,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree, history: createHashHistory() });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const persistor = persistStore(store);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AnalyserProvider>
          <ToastsProvider limit={5}>
            <RouterProvider router={router} />
          </ToastsProvider>
        </AnalyserProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
