import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
}

function Card({ children, className }: Props) {
  return (
    <div
      className={`rounded border-1 shadow-lg bg-zinc-900 border-zinc-700${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </div>
  );
}

function CardHeader({ children, className }: Props) {
  return (
    <div
      className={`border-b-1 border-zinc-700 p-2${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </div>
  );
}

function CardBody({ children, className }: Props) {
  return (
    <div className={`p-2${className ? ` ${className}` : ""}`}>{children}</div>
  );
}

function CardFooter({ children, className }: Props) {
  return (
    <div
      className={`border-t-1 border-zinc-700 p-2${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </div>
  );
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
