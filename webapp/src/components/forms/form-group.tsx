import { cloneElement, ReactElement, useId } from "react";

interface Props {
  label: string;
  description?: string;
  help?: string;
  children: ReactElement<{ id?: string }>;
}

function FormGroup({ children, label, help, description }: Props) {
  const id = useId();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-zinc-300">
        {label}
      </label>
      {description && (
        <p id={`${id}-description`} className="text-sm text-zinc-400">
          {description}
        </p>
      )}
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
