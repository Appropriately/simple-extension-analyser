import { ReactNode } from "react";
import { Link, LinkProps } from "react-router-dom";

interface Props extends LinkProps {
  children: ReactNode;
}

function RouterLink({ children, ...props }: Props) {
  return (
    <Link {...props} className="text-blue-400 hover:text-blue-500">
      {children}
    </Link>
  );
}

export default RouterLink;
