import { StrictMode } from "react";
import {
  type RenderToPipeableStreamOptions,
  renderToPipeableStream,
} from "react-dom/server";
import Content from "./routes/Content";
import Home from "./routes/Home";

export function render(_url: string, options?: RenderToPipeableStreamOptions) {
  return renderToPipeableStream(
    <StrictMode>{_url === "home" ? <Home /> : <Content />}</StrictMode>,
    options,
  );
}

//
// export function render({ path, statusCode }: IRenderProps) {
//   if (statusCode) {
//     return ReactDOMServer.renderToString(<Error statusCode={statusCode} />)
//   }

//   const html = ReactDOMServer.renderToString(
//     // The renderToString method, is used to convert React components to an HTML string, which can be sent to the client for initial rendering.
//     <React.StrictMode>
//       <StaticRouter location={path}>
//         <Router />
//       </StaticRouter>
//     </React.StrictMode>
//   )
//   return { html }
// }
