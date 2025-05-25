import { useEffect } from "react";

import { Card, Icon } from "@/components/ui";

import { Toast } from "../types/toast";

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
        return (
          <Icon
            icon="circle"
            className="me-2 text-blue-500"
            width={12}
            height={12}
          />
        );
      case "success":
        return (
          <Icon
            icon="circle"
            className="me-2 text-green-500"
            width={12}
            height={12}
          />
        );
      case "error":
        return (
          <Icon
            icon="circle"
            className="me-2 text-red-500"
            width={12}
            height={12}
          />
        );
    }

    return null;
  };

  return (
    <Card
      className="text-sm min-w-72 max-w-96"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <Card.Header className="flex items-center">
        {typeIcon()}
        <span>{toast.header}</span>
      </Card.Header>
      <Card.Body>{toast.body}</Card.Body>
      {toast.footer && <Card.Footer>{toast.footer}</Card.Footer>}
    </Card>
  );
}

export default ToastItem;
