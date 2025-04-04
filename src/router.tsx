import { createContext, use, useCallback, useEffect, useState } from "react";
import { type RouteParam, type RoutePath, getMatchedRoute } from "./router.gen";

declare global {
  interface DocumentEventMap {
    urlChanged: CustomEvent<{ location: RoutePath }>;
  }
}

export const RouterContext = createContext<{
  navigate: <T extends RoutePath>(
    path: T,
    ...args: RouteParam[T] extends never ? [] : [params: RouteParam[T]]
  ) => void;
  goBack: () => void;
  getSearchParams: <T extends RoutePath>(path: T) => RouteParam[T];
}>({
  navigate: () => {},
  goBack: () => {},
  getSearchParams: () => undefined as never,
});

export const RouterProvider = () => {
  const [currentPath, setCurrentPath] = useState<RoutePath>("/");

  const navigate = useCallback(
    <T extends RoutePath>(location: T, param?: RouteParam[T]) => {
      const evt = new CustomEvent("urlChanged", { detail: { location } });
      document.dispatchEvent(evt);

      const searchParams = param ? Object.values(param).at(0) : undefined;
      const url = searchParams
        ? location.replace(/(\$[a-zA-Z]\w*)$/, searchParams)
        : `${location}`;

      window.history.pushState({}, "", url); // url 경로를 path로 변경
      fetch(`${url}`); // 서버에 요청을 보낸다. 서버에서 해당 url에 대한 컴포넌트를 렌더링해서 응답한다.
    },
    [],
  );

  const goBack = useCallback(() => {
    window.history.back();
  }, []);

  const getSearchParams = <T extends RoutePath>(path: T): RouteParam[T] => {
    const searchParams = new URLSearchParams(window.location.search);

    if (path === "/") {
      let param: RouteParam[T] = {} as RouteParam[T];
      searchParams.forEach((value, key) => {
        param = { [key]: value } as RouteParam[T];
      });
      return param;
    }

    throw new Error("search params not found");
  };

  useEffect(() => {
    console.log("useEffect", window.location.pathname);

    document.addEventListener("urlChanged", (event) => {
      console.log("url changed", event.detail.location);
      setCurrentPath(event.detail.location);
    });

    window.addEventListener("popstate", () => {
      setCurrentPath(window.location.pathname as RoutePath);
    });
  }, []);
  const MatchedRoute = getMatchedRoute(currentPath);

  return (
    <RouterContext.Provider value={{ navigate, goBack, getSearchParams }}>
      <MatchedRoute />
    </RouterContext.Provider>
  );
};

export const useNavigate = () => {
  const context = use(RouterContext);
  return context;
};
