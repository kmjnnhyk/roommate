import { StrictMode } from "react";
import {
  type RenderToPipeableStreamOptions,
  renderToPipeableStream,
} from "react-dom/server";
import { routes } from "./routes";

export function render(_url: string, options?: RenderToPipeableStreamOptions) {
  const matchedRoute = routes[`/${_url}`];

  return renderToPipeableStream(
    <StrictMode>{matchedRoute}</StrictMode>,
    options,
  );
}
