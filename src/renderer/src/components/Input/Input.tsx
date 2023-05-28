import React from "react";
import classnames from "classnames";

export interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
}

export default function Input({ className, ...children }: InputProps) {
  return (
    <input
      className={classnames(
        className,
        "px-2 py-2 bg-neutral-300 dark:bg-neutral-800",
        "rounded-md",
        "outline-none focus:bg-neutral-100 dark:focus:bg-neutral-600",
        "ease-in-out transition-all duration-100",
        `placeholder:text-neutral-400`
      )}
      {...children}
    />
  );
}
