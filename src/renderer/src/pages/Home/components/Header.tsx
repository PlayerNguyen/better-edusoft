import classNames from "classnames";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Store";

export default function Header() {
  const user = useSelector((state: RootState) => state.app.user);
  return (
    <div className="flex flex-col gap-2">
      {/* Icon */}
      <div className={classNames("flex flex-row items-center gap-6")}>
        <h1 className={classNames("font-bold text-4xl", "text-neutral-700")}>
          Better Edusoft
        </h1>
        <span className={classNames(`text-neutral-300`)}>v1.2.3</span>
      </div>

      {/* Current user */}
      <div>
        <span className={classNames(`text-neutral-600`)}>
          Welcome <b>{user && user?.fullName}</b>
        </span>
      </div>
    </div>
  );
}
