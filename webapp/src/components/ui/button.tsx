import { ButtonHTMLAttributes, ReactNode } from "react";

const VARIANT_CLASSES = {
  primary:
    "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 dark:active:bg-blue-600",
  secondary:
    "bg-zinc-500 text-white hover:bg-zinc-600 active:bg-zinc-700 dark:bg-zinc-500 dark:hover:bg-zinc-400 dark:active:bg-zinc-600",
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: keyof typeof VARIANT_CLASSES;
}

function Button({ className, variant = "primary", ...props }: Props) {
  return (
    <button
      className={`cursor-pointer h-9 px-3 py-1 rounded  ${VARIANT_CLASSES[variant]}${className ? ` ${className}` : ""}`}
      {...props}
    >
      {props.children}
    </button>
  );
}

export default Button;
