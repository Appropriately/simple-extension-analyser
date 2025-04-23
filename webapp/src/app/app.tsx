import "@/styles/main.scss";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import { ToastsProvider } from "@/features/toasts";
import { store } from "@/stores";

import Router from "./router";

const persistor = persistStore(store);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastsProvider limit={5}>
          <Router />
        </ToastsProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
