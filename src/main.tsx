import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles/index.css";

// O navegador não deve restaurar a rolagem antes das cenas serem montadas.
if ("scrollRestoration" in history) history.scrollRestoration = "manual";

const root = document.getElementById("root");
if (!root) throw new Error("Elemento #root não encontrado.");

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
