import { ButtonHTMLAttributes, ReactNode } from "react";

import { Icon } from "@/components/ui";
import { ICONS } from "@/utils/icons";

interface TreeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: keyof typeof ICONS;
  children?: ReactNode;
}

function TreeButton({ icon, children, ...props }: TreeButtonProps) {
  return (
    <button
      className="inline-flex w-full text-sm items-center gap-2 p-1 text-zinc-300 hover:bg-zinc-700 active:bg-zinc-600 rounded-md vertical-align cursor-pointer text-left my-1 [&[aria-selected=true]]:bg-zinc-700"
      aria-selected={props["aria-selected"] ?? false}
      {...props}
    >
      {icon && <Icon icon={icon} />}
      {children}
    </button>
  );
}

export default TreeButton;
