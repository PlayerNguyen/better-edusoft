import classNames from "classnames";
import React, { useState } from "react";
import { FaCode, FaHome } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../Store";

const sideBarItems: {
  url: string;
  text: string;
  icon: React.ReactElement;
}[] = [
  {
    url: "/",
    text: "Home",
    icon: <FaHome />,
  },
  {
    url: "/settings",
    text: "Settings",
    icon: <FaCode />,
  },
];

export default function Sidebar() {
  const expand = useSelector((state: RootState) => state.sidebar.expand);
  return (
    <div
      className={classNames(
        "bg-neutral-100",
        { expand: "min-w-[200px]" },
        "h-full",
        "flex flex-col"
      )}
    >
      {sideBarItems.map((item) => {
        return (
          <Link
            to={item.url}
            className={classNames(
              "flex flex-row items-center gap-4",
              "px-4 py-3",
              "hover:bg-neutral-200"
            )}
            key={item.url}
          >
            {item.icon}
            {expand ? <p>text</p> : <></>}
          </Link>
        );
      })}
    </div>
  );
}
