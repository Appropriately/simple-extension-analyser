import { cloneElement, ReactElement, useId } from "react";

interface Props {
  label: string;
  help?: string;
  children: ReactElement<{ id?: string }>;
  className?: string;
}

function FormGroup({ children, label, help, className }: Props) {
  const id = useId();

  return (
    <div className={`flex flex-col gap-2 ${className ? className : ""}`}>
      <label htmlFor={id} className="text-sm font-medium text-zinc-300">
        {label}
      </label>
      {cloneElement(children, { id })}
      {help && (
        <p id={`${id}-help`} className="text-sm text-zinc-400">
          {help}
        </p>
      )}
    </div>
  );
}

export default FormGroup;
