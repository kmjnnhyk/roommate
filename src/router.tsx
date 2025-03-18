import { type ReactNode, createContext, useContext, useState } from "react";

export const RouterContext = createContext<{
  currentPath: string;
  navigate: (path: string) => void;
}>({ currentPath: "", navigate: () => {} });

export const RouterProvider = ({ children }: { children: ReactNode }) => {
  const [currentPath, setCurrentPath] = useState("/");

  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
    fetch(`/rsc${path}`);
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useNavigate = () => {
  const context = useContext(RouterContext);
  return context;
};
