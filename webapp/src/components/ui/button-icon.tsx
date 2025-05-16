import { ButtonHTMLAttributes } from "react";

import Icon from "@/components/ui/icon";
import { ICONS } from "@/utils/icons";

const VARIANT_CLASSES = {
  primary: "text-blue-500 hover:text-blue-600 active:text-blue-700",
  secondary: "text-zinc-500 hover:text-zinc-600 active:text-zinc-700",
  danger: "text-red-400 hover:text-red-500 active:text-red-600",
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
