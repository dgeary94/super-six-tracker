import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.jsx";
import "./style.css"; 

// Render your React component instead
const root = createRoot(document.getElementById("app"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
