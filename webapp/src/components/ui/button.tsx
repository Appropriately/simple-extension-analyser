import { ButtonHTMLAttributes, ReactNode } from "react";

const VARIANT_CLASSES = {
  primary:
    "px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700",
  secondary:
    "px-3 py-1 rounded bg-zinc-500 text-white hover:bg-zinc-600 active:bg-zinc-700",
  icon: "px-2 py-1 rounded text-zinc-400 hover:text-zinc-500 active:text-zinc-600",
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: keyof typeof VARIANT_CLASSES;
}

function Button({ className, variant = "primary", ...props }: Props) {
  return (
    <button
      className={`cursor-pointer h-9 ${VARIANT_CLASSES[variant]}${className ? ` ${className}` : ""}`}
      {...props}
    >
      {props.children}
    </button>
  );
}

export default Button;
