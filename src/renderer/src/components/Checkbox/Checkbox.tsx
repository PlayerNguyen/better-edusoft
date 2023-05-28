import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { AiOutlineCheck } from "react-icons/ai";
import classNames from "classnames";

export interface CheckboxProps {
  label?: string;
  onChecked: (value: boolean) => void;
}

export default function Checkbox({ label, onChecked }: CheckboxProps) {
  const [checked, setChecked] = useState(false);

  const handleToggleCheckbox = () => {
    setChecked((c) => !c);
  };

  const handleKeyDownToggleCheckbox = (e: any) => {
    if (e.keyCode === 32 || e.keyCode === 13) {
      setChecked((c) => !c);
    }
  };

  useEffect(() => {
    onChecked(checked);
  }, [checked]);

  return (
    <div
      className={classnames(
        "gap-2 cursor-pointer",
        {
          "flex flex-row items-center": label !== undefined,
          "inline-block": label === undefined,
        },
        "text-neutral-400 hover:text-neutral-600"
      )}
      onClick={handleToggleCheckbox}
    >
      <div
        tabIndex={0}
        onKeyDown={handleKeyDownToggleCheckbox}
        className={classnames(
          "relative w-6 h-6",
          {
            "bg-blue-600": checked,
            "bg-neutral-300 dark:bg-neutral-800": !checked,
            "rounded-lg": !checked,
            "rounded-xl": checked,
          },
          "flex place-content-center items-center",
          "ease-in-out transition-all duration-[300ms]",
          "text-neutral-300"
        )}
      >
        {checked && (
          <AiOutlineCheck className={`font-3xl duration-75 ease-in-out`} />
        )}
      </div>
      {label !== undefined && (
        <span
          className={classNames(
            `transition-all ease-linear duration-75 select-none`,
            {
              "text-blue-600": checked,
            },
            "text-xs"
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
}
