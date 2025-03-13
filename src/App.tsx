import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const LazyDashboard = lazy(() => import("./routes/Dashboard"));
const LazyHome = lazy(() => import("./routes/Home"));

export default function App() {
  return (
    <Routes>
      <Route index element={<LazyHome />} />
      <Route path="/dashboard" element={<LazyDashboard />} />
    </Routes>
  );
}
