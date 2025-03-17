import "./index.css";
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import Content from "./routes/Content";
import Home from "./routes/Home";

console.log("document.location", document.location);

hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <StrictMode>
    {document.location.pathname === "/home" ? <Home /> : <Content />}
  </StrictMode>,
);
