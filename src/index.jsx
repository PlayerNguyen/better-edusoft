import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const app = document.getElementById("app");
if (app === undefined || app === null) {
  throw new Error("Unable to find #app element");
}

createRoot(app).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
