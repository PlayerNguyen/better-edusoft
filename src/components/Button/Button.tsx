import classNames from "classnames";
import React, { ReactElement } from "react";

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  context: ReactElement;
  className?: string;
}

export default function Button({
  context,
  className,
  ...children
}: ButtonProps) {
  return (
    <button
      className={classNames(
        `px-4 py-2 bg-neutral-300 rounded-md hover:text-neutral-900 transition-all ease-in-out`,
        `duration-150 text-neutral-700`,
        `hover:bg-neutral-400`,
        className
      )}
      {...children}
    >
      {context}
    </button>
  );
}
