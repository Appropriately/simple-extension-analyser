import { ButtonHTMLAttributes, ReactNode } from "react";

import Icon from "@/components/icon";
import { ICONS } from "@/utils/icons";

interface TreeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: keyof typeof ICONS;
  children?: ReactNode;
}

function TreeButton({ icon, children, ...props }: TreeButtonProps) {
  return (
    <button
      className="flex text-sm items-center gap-2 p-1 text-zinc-300 hover:bg-zinc-700 active:bg-zinc-600 rounded-md vertical-align cursor-pointer text-left my-1"
      {...props}
    >
      {icon && <Icon icon={icon} />}
      {children}
    </button>
  );
}

export default TreeButton;
