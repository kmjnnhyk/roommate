import GameId from "./routes/game.$id";
import Root from "./routes/index";
import Lobby from "./routes/lobby";
import ProfileCreate from "./routes/profile.create";
import RoomId from "./routes/room.$id";


export type RoutePath = '/game/$id' | '/' | '/lobby' | '/profile/create' | '/room/$id' 

export type RouteParam = { "/game/$id": {id: string};  "/": never;  "/lobby": never;  "/profile/create": never;  "/room/$id": {id: string}; }

export const getMatchedRoute = (currentPath: RoutePath) => {
  switch (currentPath) {
    case "/game/$id":
      return GameId;
    case "/":
      return Root;
    case "/lobby":
      return Lobby;
    case "/profile/create":
      return ProfileCreate;
    case "/room/$id":
      return RoomId;
  }
}