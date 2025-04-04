import type { Plugin } from "vite";

import * as fs from "node:fs";
import * as path from "node:path";

interface RouteInfo {
  path: string;
  filePath: string;
  params?: Record<string, string>;
}

export default function routesGenPlugin(options: {
  routesDir?: string;
  output?: string;
}): Plugin {
  const routesDir = options.routesDir || "src/routes";
  const outputPath = options.output || "src/router.gen.ts";

  return {
    name: "vite-plugin-routes-gen",

    buildStart() {
      generateRouteTypes(routesDir, outputPath);
    },
    watchChange(file) {
      const hasRoutesChanged = file.includes("src/routes/");
      if (hasRoutesChanged) {
        generateRouteTypes(routesDir, outputPath);
      }
    },
  };
}

function generateRouteTypes(routesDir: string, outputPath: string) {
  const routes: RouteInfo[] = [];
  const rootDir = process.cwd();
  const fullRoutesPath = path.join(rootDir, routesDir);

  // 라우트 수집
  collectRoutes(fullRoutesPath, routes);

  // TypeScript 타입 정의 생성
  const typeDefinitions = generateTypeDefinitions(routes);

  // 파일에 저장
  const fullOutputPath = path.join(rootDir, outputPath);
  fs.mkdirSync(path.dirname(fullOutputPath), { recursive: true });
  fs.writeFileSync(fullOutputPath, typeDefinitions, "utf-8");
}

function collectRoutes(dir: string, routes: RouteInfo[] = []): void {
  if (!fs.existsSync(dir)) return;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const ext = path.extname(entry.name);
    if (![".tsx", ".jsx", ".ts", ".js"].includes(ext)) continue;

    // 확장자 제거
    const filePath = entry.name.replace(/\.(tsx|jsx|ts|js)$/, "");
    const fullPath = filePath.replace(/\./g, "/");

    const isRoot = fullPath === "index";
    if (isRoot) {
      routes.push({
        path: "/",
        filePath,
      });
      continue;
    }

    const lastPartOfPath = fullPath.split("/").at(-1);
    if (!lastPartOfPath) {
      throw new Error("[generate route error]: is wrong route name");
    }

    const hasParams = lastPartOfPath?.startsWith("$");
    if (hasParams) {
      const paramName = lastPartOfPath.replace("$", "");
      routes.push({
        path: `/${fullPath}`,
        filePath,
        params: { [paramName]: "string" },
      });
    }

    if (!hasParams) {
      routes.push({
        path: `/${fullPath}`,
        filePath,
      });
    }
  }
}

function generateTypeDefinitions(routes: RouteInfo[]): string {
  const routeImports = routes.reduce((acc, route) => {
    const parts = route.filePath.split(/[.$]/);
    const pascalParts = parts
      .filter((part) => part !== "")
      .map((part) => {
        if (part === "index") {
          return "Root";
        }
        return part.charAt(0).toUpperCase() + part.slice(1);
      })
      .join("");

    return `${acc}import ${pascalParts} from "./routes/${route.filePath}";\n`;
  }, "");

  const routesPaths = routes.reduce((acc, route, index) => {
    return `${acc} '${route.path}' ${index < routes.length - 1 ? "|" : ""}`;
  }, "export type RoutePath =");

  const routesParams = routes.reduce((acc, route, index) => {
    const lastFlag = index === routes.length - 1 ? "}" : "";
    if (!route.params) {
      return `${acc} "${route.path}": never; ${lastFlag}`;
    }

    const key = Object.keys(route.params)[0];
    const value = Object.values(route.params)[0];
    return `${acc} "${route.path}": {${key}: ${value}}; ${lastFlag}`;
  }, "export type RouteParam = {");

  const matchedRoute = routes.reduce((acc, route, index) => {
    const parts = route.filePath.split(/[.$]/);
    const pascalParts = parts
      .filter((part) => part !== "")
      .map((part) => {
        if (part === "index") {
          return "Root";
        }
        return part.charAt(0).toUpperCase() + part.slice(1);
      })
      .join("");
    return `${acc}    case "${route.path}":\n      return ${pascalParts};\n${index < routes.length - 1 ? "" : "  }\n}"}`;
  }, "export const getMatchedRoute = (currentPath: RoutePath) => {\n  switch (currentPath) {\n");

  return `${routeImports}\n\n${routesPaths}\n\n${routesParams}\n\n${matchedRoute}`;
}
