import React from "react";
import { Outlet } from "react-router-dom";

export default function AppWrapper() {
  return (
    <div>
      AppWrapper
      <Outlet />
    </div>
  );
}
