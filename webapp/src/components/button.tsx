import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function Button({ className, ...props }: Props) {
  return (
    <button
      className={`bg-blue-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-blue-600 ${className}`}
      {...props}
    >
      {props.children}
    </button>
  );
}

export default Button;
