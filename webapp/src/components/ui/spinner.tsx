interface Props {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

function Spinner({ size = "md", className }: Props) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-12 w-12 border-6",
    xl: "h-16 w-16 border-8",
  };

  return (
    <div
      className={`flex justify-center items-center${className ? ` ${className}` : ""}`}
    >
      <div
        className={`animate-spin ${sizeClasses[size]} border-zinc-500 border-t-transparent rounded-full`}
      />
    </div>
  );
}

export default Spinner;
