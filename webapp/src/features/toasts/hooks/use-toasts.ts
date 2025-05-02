import { useEffect, useMemo, useState } from "react";

import { useToastsContext } from "../context/toasts";
import { Toast, ToastIdType, ToastWithId } from "../types/toast";

let toastId = 0;

export const useToasts = () => {
  const [toastOptsQueue, setToastOptsQueue] = useState<ToastWithId[]>([]);

  const context = useToastsContext();

  const api = useMemo(() => {
    const show = (toast: Toast) => {
      const id = toastId++;
      setToastOptsQueue((q) => [...q, { ...toast, id }]);
      return id;
    };

    // Shows a toast with a custom error message and a default duration of 5 seconds.
    const error = (error: Error) => {
      const toast: Toast = {
        header: error.name,
        body: error.message,
        type: "error",
        durationMs: 5000,
      };
      return show(toast);
    };

    return {
      show,
      error,
      hide: (id: ToastIdType) => context.current?.hide(id),
    };
  }, [context]);

  useEffect(() => {
    const { current } = context;
    if (current !== null && toastOptsQueue.length) {
      toastOptsQueue.forEach((opts) => current.show(opts));
      setToastOptsQueue([]);
    }
  }, [context, toastOptsQueue]);

  return api;
};
