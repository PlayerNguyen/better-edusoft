import React from "react";
import "./index.css";

import { createHashRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";

import SignIn from "./components/SignIn/SignIn";
import AppWrapper from "./pages/AppWrapper/AppWrapper";
import { RootState } from "../src/Store";
import Home from "./pages/Home/Home";

const hashRouter = createHashRouter([
  {
    path: "/",
    element: <AppWrapper />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

export default function App() {
  const user = useSelector((state: RootState) => state.app.user);
  return user === undefined ? (
    <SignIn />
  ) : (
    <RouterProvider router={hashRouter} />
  );
}
