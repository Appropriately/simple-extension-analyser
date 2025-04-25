import {
  forwardRef,
  ReactNode,
  RefObject,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { ToastsContext, ToastsHandle } from "../context/toasts";
import { ToastIdType, ToastWithId } from "../types/toast";
import ToastItem from "./toast-item";

const Toasts = forwardRef<ToastsHandle, { limit?: number }>(
  ({ limit }, ref) => {
    const [toasts, setToasts] = useState<ToastWithId[]>([]);

    const show = (toast: ToastWithId) => {
      setToasts((state) => {
        const clone = [...state];
        clone.push(toast);
        if (limit && clone.length > limit) clone.shift();

        return clone;
      });
    };

    const hide = (id: ToastIdType) =>
      setToasts((state) => [...state].filter((t) => t.id !== id));

    useImperativeHandle(ref, () => ({
      show,
      hide,
    }));

    return (
      <div className="fixed top-0 right-0 z-50 flex flex-col gap-2 p-3">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={() => hide(toast.id)}
          />
        ))}
      </div>
    );
  }
);

interface ToastsProviderProps {
  children: ReactNode;
  limit?: number;
}

function ToastsProvider({ children, limit }: ToastsProviderProps) {
  const toastsRef = useRef<ToastsHandle>(null);

  return (
    <ToastsContext.Provider value={toastsRef as RefObject<ToastsHandle>}>
      {children}
      <Toasts ref={toastsRef} limit={limit} />
    </ToastsContext.Provider>
  );
}

export default ToastsProvider;
