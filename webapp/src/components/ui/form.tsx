import { HTMLAttributes, FormEvent } from "react";

interface FormProps<T>
  extends Omit<HTMLAttributes<HTMLFormElement>, "onSubmit"> {
  onSubmit: (data: T) => void;
}

function Form<T>({ children, className, onSubmit, ...props }: FormProps<T>) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity();
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = {} as T;

    for (const [key, value] of formData.entries())
      data[key as keyof T] = value as T[keyof T];

    onSubmit(data);
  };

  return (
    <form
      className={className}
      onSubmit={handleSubmit}
      noValidate={false}
      {...props}
    >
      {children}
    </form>
  );
}

export default Form;
