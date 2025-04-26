import { useEffect } from "react";

import { Toast } from "../types/toast";
import Icon from "@/components/icon";

interface ToastItemProps {
  toast: Toast;
  onClose?: () => void;
}

function ToastItem({ toast, onClose }: ToastItemProps) {
  useEffect(() => {
    if (toast.durationMs) {
      const timer = setTimeout(() => onClose?.(), toast.durationMs);
      return () => clearTimeout(timer);
    }
  });

  const typeIcon = () => {
    switch (toast.type) {
      case "info":
        return <Icon icon="circle" className="me-2 text-blue-500" width={12} height={12} />;
      case "success":
        return <Icon icon="circle" className="me-2 text-green-500" width={12} height={12} />;
      case "error":
        return <Icon icon="circle" className="me-2 text-red-500" width={12} height={12} />;
    }

    return null;
  };

  return (
    <div
      className="bg-zinc-700 border-1 border-zinc-600 rounded shadow-lg text-sm min-w-72 max-w-96"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      {toast.header && typeof toast.header === "string" ? (
        <div className="border-b-1 border-zinc-600 p-2 text-zinc-400 flex items-center">
          {typeIcon()}
          {toast.header}
        </div>
      ) : (
        toast.header
      )}
      <div className="p-2">{toast.body}</div>
      {toast.footer && <div className="p-2">{toast.footer}</div>}
    </div>
  );
}

export default ToastItem;
