import classNames from "classnames";
import React from "react";
import { FaCalendar } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NextSchedule() {
  return (
    <div className={classNames("flex flex-col gap-4")}>
      {/* Header */}
      <div>
        <div
          className={classNames(
            "flex flex-row items-center gap-4",
            "text-neutral-600"
          )}
        >
          <FaCalendar />
          <h1 className={classNames("font-bold text-2xl")}>Next lecture</h1>
        </div>
      </div>

      {/* Scrollable right blocks */}
      <div className={classNames(`flex flex-row gap-4`)}>
        {[...new Array(3)].fill([]).map((_object, _index) => {
          return (
            <div
              className={classNames(
                "inline-block",
                "px-4 py-2",
                "rounded-md",
                "w-1/3",
                " bg-neutral-100 hover:bg-neutral-200",
                "transition-colors"
              )}
              key={_index}
            >
              <div className={classNames("flex flex-col gap-2")}>
                <div className={classNames("text-6xl")}>
                  {/* <FaCalendar /> */}
                </div>
                <div className={classNames("text-sm")}>
                  Object Oriented Programming
                </div>
                <b>A2.401</b>
                <span>{new Date().toDateString()}</span>
              </div>
            </div>
          );
        })}
      </div>
      {/* Details */}
      <div className={classNames(`flex flex-row-reverse`)}>
        <Link to="/schedule">Details</Link>
      </div>
    </div>
  );
}
