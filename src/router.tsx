import {
  type ReactNode,
  createContext,
  use,
  useCallback,
  useEffect,
  useState,
} from "react";
import { routerConfig } from "../router.config";

export type RouterPath = keyof typeof routerConfig;

type SearchParamsConfig = {
  "/": never;
  "/content": { id: string };
};

type SearchParamsMapper<Path> = {
  [Property in keyof Path]: Path[Property];
};

type SearchParams = SearchParamsMapper<SearchParamsConfig>;

export const RouterContext = createContext<{
  currentPath: RouterPath;
  navigate: {
    (path: "/", params?: never): void;
    (path: "/content", params: SearchParams["/content"]): void;
  };
  goBack: () => void;
  getSearchParams: <T extends RouterPath>(path: T) => SearchParams[T];
}>({
  currentPath: "/",
  navigate: () => {},
  goBack: () => {},
  getSearchParams: () => undefined as never,
});

export const RouterProvider = ({ children }: { children: ReactNode }) => {
  const [currentPath, setCurrentPath] = useState<RouterPath>("/");

  const navigate = useCallback(
    <T extends RouterPath>(location: T, params?: SearchParams[T]) => {
      const matchedRouteConfig = routerConfig[location];
      if (!matchedRouteConfig) {
        throw new Error("navigate error: no matched config");
      }

      const searchParams = params ? new URLSearchParams(params) : undefined;
      const url = searchParams
        ? `${location}?${searchParams.toString()}`
        : `${location}`;
      window.history.pushState({}, "", url); // url 경로를 path로 변경

      setCurrentPath(location); // currentPath를 path로 변경. client단에서 현재 어떤 페이지 컴포넌트를 보여줄지 결정할 때 사용한다.

      const { ssr } = matchedRouteConfig;
      if (ssr) {
        fetch(`${url}`); // 서버에게 해당 path로 데이터를 요청한다.
      }
    },
    [],
  );

  // const getSearchParams = () => {
  //   const searchParams = new URLSearchParams(window.location.search);
  //   console.log("2222", searchParams.get("id"));
  //   return window.location.search;
  // };

  const goBack = useCallback(() => {
    window.history.back();
  }, []);

  const getSearchParams = <T extends RouterPath>(path: T): SearchParams[T] => {
    const searchParams = new URLSearchParams(window.location.search);

    if (path === "/content") {
      let param: SearchParams[T] = {} as SearchParams[T];
      searchParams.forEach((value, key) => {
        param = { [key]: value } as SearchParams[T];
      });
      return param;
    }

    throw new Error("search params not found");
  };

  useEffect(() => {
    function handlePopState() {
      setCurrentPath(window.location.pathname as RouterPath);
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <RouterContext.Provider
      value={{ currentPath, navigate, goBack, getSearchParams }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export const useNavigate = () => {
  const context = use(RouterContext);
  return context;
};
