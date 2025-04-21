import { ReactNode } from "react";

export type ToastIdType = number;

export interface Toast {
    header?: string | ReactNode;
    body: string | ReactNode;
    footer?: string | ReactNode;
    type?: "info" | "success" | "error";
    durationMs?: number;
}

export interface ToastWithId extends Toast {
  id: ToastIdType;
}
