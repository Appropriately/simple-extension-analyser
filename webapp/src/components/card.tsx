import { ReactNode } from "react";

interface CardProps {
  header?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

function Card({ header, children, footer, className }: CardProps) {
  return (
    <div className={`rounded border-1 shadow-lg bg-zinc-900 border-zinc-700 ${className}`}>
      {header && <div className="border-b-1 border-zinc-700 p-2">{header}</div>}
      <div className="p-2">{children}</div>
      {footer && <div className="border-t-1 border-zinc-700 p-2">{footer}</div>}
    </div>
  );
}

export default Card;
