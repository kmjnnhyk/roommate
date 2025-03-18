import { useNavigate } from "./router";
import Content from "./routes/Content";
import Home from "./routes/Home";

export default function App() {
  const { currentPath } = useNavigate();

  if (currentPath === "/") {
    return <Home />;
  }

  if (currentPath === "/content") {
    return <Content />;
  }

  return null;
}
