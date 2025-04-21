import { createContext, type RefObject, useContext } from "react";

import { ToastIdType, ToastWithId } from "../types/toast";

export interface ToastsHandle {
  show: (toast: ToastWithId) => void;
  hide: (id: ToastIdType) => void;
}

export const ToastsContext = createContext<RefObject<ToastsHandle> | undefined>(undefined);

export const useToastsContext = () => {
  const context = useContext(ToastsContext);
  if (context === undefined) throw new Error("useToastsContext must be used within a ToastsProvider");

  return context;
};
