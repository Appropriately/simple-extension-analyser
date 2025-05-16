interface Props {
  className?: string;
  quantity?: number;
}

const SIZES = ["w-12", "w-18", "w-20", "w-20", "w-24", "w-48"];

// Placeholder is a utility component for generating placeholder text.
function PlaceholderText({ className, quantity = 1 }: Props) {
  return (
    <>
      {Array.from({ length: quantity }).map((_, index) => (
        <div
          key={index}
          className={`h-4 bg-zinc-600 rounded animate-pulse ${
            SIZES[Math.floor(Math.random() * SIZES.length)]
          }${className ? ` ${className}` : ""}`}
        />
      ))}
    </>
  );
}

export default PlaceholderText;
