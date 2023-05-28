import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import rootStore from "./Store";

const app = document.getElementById("app");
if (app === undefined || app === null) {
  throw new Error("Unable to find #app element");
}

createRoot(app).render(
  <React.StrictMode>
    <Provider store={rootStore}>
      <App />
    </Provider>
  </React.StrictMode>
);
