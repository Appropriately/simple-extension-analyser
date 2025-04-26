import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function Button({ className, ...props }: Props) {
  return (
    <button className={`text-red ${className}`} {...props}>
      {props.children}
    </button>
  );
}

export default Button;
