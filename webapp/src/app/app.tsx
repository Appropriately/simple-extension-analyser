import "@/styles/main.scss";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { ToastsProvider } from "@/features/toasts";
import { store } from "@/stores";

import Router from "./router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ToastsProvider limit={5}>
        <Router />
      </ToastsProvider>
    </Provider>
  </StrictMode>
);
