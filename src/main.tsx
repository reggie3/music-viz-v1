import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "typeface-roboto";
import "@fontsource/orbitron"; // Defaults to weight 400
import "@fontsource/inconsolata";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
