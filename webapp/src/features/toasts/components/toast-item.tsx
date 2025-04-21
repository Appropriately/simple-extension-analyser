import "../styles/toast-item.scss";

import { useEffect } from "react";

import { Toast } from "../types/toast";

interface ToastItemProps {
  toast: Toast;
  onClose?: () => void;
}

function ToastItem({ toast, onClose }: ToastItemProps) {
  // Automatically close the toast after the specified duration.
  useEffect(() => {
    if (toast.durationMs) {
      const timer = setTimeout(() => onClose?.(), toast.durationMs);
      return () => clearTimeout(timer);
    }
  });

  return (
    <div
      className={`toast${toast.type ? ` toast-${toast.type}` : ""} show`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      {toast.header && <div className="toast-header">{toast.header}</div>}
      <div className="toast-body">{toast.body}</div>
      {toast.footer && <div className="toast-footer">{toast.footer}</div>}
    </div>
  );
}

export default ToastItem;
