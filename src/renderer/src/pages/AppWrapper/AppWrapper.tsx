import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import classNames from "classnames";

export default function AppWrapper() {
  return (
    <div className={classNames("flex flex-row gap-4 fixed w-full h-full")}>
      {/*Side bar  */}
      <Sidebar />

      {/* Outlet */}
      <Outlet />
    </div>
  );
}
