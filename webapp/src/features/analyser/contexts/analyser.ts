import { createContext, useContext } from "react";

import { AnalyserHandle } from "../types";

export const AnalyserContext = createContext<AnalyserHandle | undefined>(
  undefined
);

export const useAnalyser = () => {
  const context = useContext(AnalyserContext);
  if (context === undefined)
    throw new Error("useAnalyser must be used within a WasmProvider");
  return context;
};
