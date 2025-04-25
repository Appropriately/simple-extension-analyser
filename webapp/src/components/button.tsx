import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function Button({ className, ...props }: ButtonProps) {
  return (
    <button className={`text-red ${className}`} {...props}>
      {props.children}
    </button>
  );
}

export default Button;
