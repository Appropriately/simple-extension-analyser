import { InputHTMLAttributes } from "react";

function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`block w-full text-sm bg-zinc-800 text-zinc-300 border border-zinc-700 placeholder-zinc-500 rounded-md cursor-pointer p-1 focus:outline-none file:bg-zinc-700 file:border-0 file:text-sm file:py-2 file:px-3 file:me-2 file:font-semibold file:rounded-md file:cursor-pointer hover:file:bg-zinc-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
      {...props}
    />
  );
}
export default Input;
