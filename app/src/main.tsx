import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./globals.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
  { /* @ts-ignore */ }
    <div style={{"WebkitAppRegion": "drag", position: "absolute", height: "30px", width: "100vw"}} />
    <App />
  </React.StrictMode>
);

postMessage({ payload: "removeLoading" }, "*");
