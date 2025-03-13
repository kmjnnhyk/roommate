// router.jsx
import type { JSX } from "react";
import Dashboard from "./Dashboard";
import Home from "./Home";

export const routes: Record<string, JSX.Element> = {
  "/": <Home />,
  "/dashboard": <Dashboard />,
};
