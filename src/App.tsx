import React from "react";
import "./index.css";

import { HashRouter, Routes, Route } from "react-router-dom";
import { useFirstLoad } from "./hooks/useFirstLoad";

import SignIn from "./components/SignIn/SignIn";

export default function App() {
  const { isFirstLoad } = useFirstLoad();
  return isFirstLoad ? <SignIn /> : <HashRouter></HashRouter>;
}
