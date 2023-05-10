import classNames from "classnames";
import React, { ReactElement } from "react";
import Input from "./Input";

export interface IconInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  iconComponent: ReactElement;
  iconClassName?: string;
  className?: string;
}

export default function IconInput({
  iconComponent,
  className,
  iconClassName,
  ...children
}: IconInputProps) {
  if (iconComponent === undefined) {
    throw new Error(
      `Icon is not set for IconInput. Please using prop iconComponent value.`
    );
  }

  return (
    <div className={classNames(`flex flex-row items-center`)}>
      {/* Icons */}
      <div
        className={classNames(
          `bg-neutral-300 dark:bg-neutral-800 px-2 py-2 rounded-md rounded-r-none`,
          iconClassName
        )}
      >
        <i className="text-2xl">{iconComponent}</i>
      </div>

      {/* Inputs */}
      <Input
        className={classNames(`rounded-l-none w-full`, className)}
        {...children}
      />
    </div>
  );
}
