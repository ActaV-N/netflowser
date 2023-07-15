import React from "react";
import ReactDOM from "react-dom/client";
import { FinProvider } from "@actav/floating-icon-navigation";

const rootElement = document.createElement("div");
rootElement.id = "netflowser";
document.appendChild(rootElement);

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <FinProvider>App</FinProvider>
  </React.StrictMode>,
);
