import { Server, Socket } from "socket.io";
import { mySocket } from "../types";

let interval: NodeJS.Timeout | null = null;

export default function (socket: mySocket, io: Server) {
  socket.on("timerStart", (seconds: number) => {
    if (!interval) {
      interval = setInterval(() => {
        seconds--;
        if (seconds === 0) {
          clearInterval(interval!);
          interval = null;
        } else {
          io.emit("timer", seconds);
          console.log(seconds);
        }
      }, 1000);
    }
  });

  socket.on("disconnect", () => {
    if (io.engine?.clientsCount === 0) {
      clearInterval(interval!);
      interval = null;
    }
    console.log("A user disconnected");
  });
}
