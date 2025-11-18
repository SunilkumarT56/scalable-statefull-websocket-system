import http from "http";
import { Socket } from "socket.io";
import SocketServer from "./controller/websocket.js";

const PORT = process.env.PORT || 4000;

async function init() {
  const httpServer = http.createServer();  // create a http server
  const socketServer = new SocketServer(httpServer); // bind the http server to socket server
  httpServer.listen(PORT, () => {
    console.log(`App is up and running on ${PORT}`);
  });
  socketServer.eventListener();  // access the eventlistener in SocketServer class
}
init();
