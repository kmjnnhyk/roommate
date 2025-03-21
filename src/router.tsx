import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export const RouterContext = createContext<{
  currentPath: string;
  navigate: (path: string) => void;
}>({ currentPath: "", navigate: () => {} });

export const RouterProvider = ({ children }: { children: ReactNode }) => {
  const [currentPath, setCurrentPath] = useState("/");

  const navigate = useCallback((path: string) => {
    window.history.pushState({}, "", path); // url 경로를 path로 변경
    setCurrentPath(path); // currentPath를 path로 변경. client단에서 현재 어떤 페이지 컴포넌트를 보여줄지 결정할 때 사용한다.
    fetch(`${path}`); // 서버에게 해당 path로 데이터를 요청한다.
  }, []);

  useEffect(() => {
    function handlePopState() {
      navigate(window.location.pathname);
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigate]);

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
