import { ButtonHTMLAttributes } from "react";

import Icon from "@/components/ui/icon";
import { ICONS } from "@/utils/icons";

const VARIANT_CLASSES = {
  primary:
    "text-blue-500 hover:text-blue-600 active:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 dark:active:text-blue-400",
  secondary:
    "text-zinc-500 hover:text-zinc-600 active:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300 dark:active:text-zinc-400",
  danger:
    "text-red-500 hover:text-red-600 active:text-red-700 dark:text-red-400 dark:hover:text-red-300 dark:active:text-red-400",
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: keyof typeof ICONS;
  variant?: keyof typeof VARIANT_CLASSES;
}

function ButtonIcon({ className, variant = "primary", icon, ...props }: Props) {
  return (
    <button
      className={`px-2 py-1 cursor-pointer h-9 ${VARIANT_CLASSES[variant]}${className ? ` ${className}` : ""}`}
      {...props}
    >
      <Icon icon={icon} />
    </button>
  );
}

export default ButtonIcon;
