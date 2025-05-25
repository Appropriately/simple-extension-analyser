import { HTMLAttributes, ReactNode } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
}

function Card({ children, className, ...props }: Props) {
  return (
    <div
      className={`rounded border-1 shadow-lg bg-zinc-200 dark:bg-zinc-900 border-zinc-400 dark:border-zinc-700${
        className ? ` ${className}` : ""
      }`}
      {...props}
    >
      {children}
    </div>
  );
}

function CardHeader({ children, className, ...props }: Props) {
  return (
    <div
      className={`border-b-1 border-zinc-400 dark:border-zinc-700 p-2${
        className ? ` ${className}` : ""
      }`}
      {...props}
    >
      {children}
    </div>
  );
}

function CardBody({ children, className, ...props }: Props) {
  return (
    <div className={`p-2${className ? ` ${className}` : ""}`} {...props}>
      {children}
    </div>
  );
}

function CardFooter({ children, className, ...props }: Props) {
  return (
    <div
      className={`border-t-1 border-zinc-400 dark:border-zinc-700 p-2${
        className ? ` ${className}` : ""
      }`}
      {...props}
    >
      {children}
    </div>
  );
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
