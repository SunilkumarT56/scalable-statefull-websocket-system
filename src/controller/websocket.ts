import { Server } from "socket.io";
import { Redis } from "ioredis";

const pub = new Redis({
  host: process.env.REDIS_HOST || "redis",
  port: Number(process.env.REDIS_PORT) || 6379,
});

const sub = new Redis({
  host: process.env.REDIS_HOST || "redis",
  port: Number(process.env.REDIS_PORT) || 6379,
});
class SocketServer {
  private _io: Server; // All socket events are controlled by this _io
  constructor(httpServer: any) {
    console.log("Socket Server initialized");
    this._io = new Server(httpServer); // creating server instance and binding it with the http server
    sub.subscribe("MESSAGE");
  }
  public eventListener() {
    const io = this._io;
    console.log("listening");
    io.on("connect", (socket) => {
      console.log("user is connected", socket.id);
      socket.on("message", async (message) => {
        console.log(message);
        //socket.emit(message);  // not a scalable approach because this line emit the messages to the clients which connected to same server
        pub.publish("MESSAGE", JSON.stringify({ message }));
      });
      socket.on("close", () => {
        console.log("user is diconnected", socket.id);
      });
    });
    sub.on("message", (channel, message) => {
      io.emit(channel, JSON.parse(message));
    });
  }
}
export default SocketServer;
