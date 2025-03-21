import { StrictMode } from "react";
import {
  type PipeableStream,
  type RenderToPipeableStreamOptions,
  renderToPipeableStream,
  renderToString,
} from "react-dom/server";
import App from "./app";
import { RouterProvider } from "./router";

type StreamRenderFuncProps = {
  url: string;
  stream: true;
  options: RenderToPipeableStreamOptions;
};

type StaticRenderFuncProps = {
  url: string;
  stream: false;
};

type RenderedResult<Props> = Props extends { stream: true }
  ? PipeableStream
  : string;

export type RenderFunc = <
  Props extends StreamRenderFuncProps | StaticRenderFuncProps,
>(
  props: Props,
) => RenderedResult<Props>;

export const render: RenderFunc = (props) => {
  if (props.stream) {
    const { options } = props;
    return renderToPipeableStream(
      <StrictMode>
        <RouterProvider>
          <App />
        </RouterProvider>
      </StrictMode>,
      options,
    ) as RenderedResult<typeof props>;
  }

  return renderToString(
    <StrictMode>
      <RouterProvider>
        <App />
      </RouterProvider>
    </StrictMode>,
  ) as RenderedResult<typeof props>;
};
