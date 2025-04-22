import "./styles/main.scss";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ToastsProvider } from "@/features/toasts";

import App from "./app/app.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastsProvider limit={5}>
      <App />
    </ToastsProvider>
  </StrictMode>
);
