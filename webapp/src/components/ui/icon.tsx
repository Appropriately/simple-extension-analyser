import { ICONS } from "@/utils/icons";

interface IconProps {
  icon: keyof typeof ICONS;
  className?: string;
  width?: number;
  height?: number;
}

/**
 * Icon component that renders a Bootstrap SVG icon based on the provided name.
 * @param {string} icon - The name of the icon to render.
 * @param {string} [className] - Additional class names to apply to the icon.
 * @returns {JSX.Element} The rendered icon.
 */
function Icon({ icon, className, width, height }: IconProps) {
  const iconData = ICONS[icon];

  return (
    <svg
      dangerouslySetInnerHTML={{ __html: iconData }}
      className={`bi bi-${icon}${className ? " " + className : ""}`}
      viewBox={"0 0 16 16"}
      fill="currentColor"
      width={width ?? 16}
      height={height ?? 16}
      xmlns="http://www.w3.org/2000/svg"
    ></svg>
  );
}

export default Icon;
