import { StrictMode } from "react";
import {
  type PipeableStream,
  type RenderToPipeableStreamOptions,
  renderToPipeableStream,
} from "react-dom/server";
import App from "./app";
import { RouterProvider } from "./router";

type RenderFuncProps = {
  url: string;
  options: RenderToPipeableStreamOptions;
};

export type RenderFunc = (props: RenderFuncProps) => PipeableStream;

export const render: RenderFunc = ({ options }) => {
  return renderToPipeableStream(
    <StrictMode>
      <RouterProvider>
        <App />
      </RouterProvider>
    </StrictMode>,
    options,
  );
};
