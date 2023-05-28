import React from "react";
import "./index.css";

import { createHashRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";

import SignIn from "./components/SignIn/SignIn";
import AppWrapper from "../src/AppWrapper/AppWrapper";
import { RootState } from "../src/Store";

const hashRouter = createHashRouter([
  {
    path: "/",
    element: <AppWrapper />,
  },
]);

export default function App() {
  const sessionId = useSelector((state: RootState) => state.app.sessionId);
  return sessionId === undefined ? (
    <SignIn />
  ) : (
    <RouterProvider router={hashRouter} />
  );
}
