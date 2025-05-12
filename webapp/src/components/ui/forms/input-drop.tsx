import { ChangeEvent, DragEvent, InputHTMLAttributes } from "react";

import Icon from "../icon";

const DRAG_BG = "bg-zinc-700/80";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  onFileChange?: (file?: File) => void;
}

function InputDrop({ className, onFileChange, ...props }: Props) {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      onFileChange?.(file);
    }
  };

  const onDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.currentTarget.classList.add(DRAG_BG);
  };

  const onDragLeave = (event: DragEvent<HTMLLabelElement>) => {
    event.currentTarget.classList.remove(DRAG_BG);
  };

  const onDrop = (event: DragEvent<HTMLLabelElement>) => {
    console.log("File dropped");
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      onFileChange?.(file);
    }
  };

  return (
    <div className={`w-full ${className ? className : ""}`}>
      <label
        className="flex justify-center w-full h-24 px-4 transition bg-zinc-700/60 border-2 border-zinc-500 border-dashed rounded-md appearance-none cursor-pointer hover:border-zinc-400 focus:outline-none"
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
      >
        <span className="flex items-center space-x-2">
          <Icon
            icon="cloud-upload"
            width={18}
            height={18}
            className="text-zinc-300"
          />
          <span className="text-zinc-300">
            Drop files to attach, or{" "}
            <span className="text-zinc-300 underline">browse</span>
          </span>
        </span>
        <input type="file" className="hidden" onChange={onChange} {...props} />
      </label>
    </div>
  );
}
export default InputDrop;
