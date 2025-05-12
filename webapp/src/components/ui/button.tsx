import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

function Button({ className, variant = "primary", ...props }: Props) {
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700",
    secondary: "bg-zinc-500 text-white hover:bg-zinc-600 active:bg-zinc-700",
  };

  return (
    <button
      className={`px-3 py-1 rounded cursor-pointer ${variantClasses[variant]}${className ? ` ${className}` : ""}`}
      {...props}
    >
      {props.children}
    </button>
  );
}

export default Button;
