import { Server, Socket } from "socket.io";

let interval: NodeJS.Timeout | null = null;

export default function (socket: Socket, io: Server) {
  socket.on("timer-start", (time: number) => {
    if (!interval) {
      interval = setInterval(() => {
        time--;
        if (time === 0) {
          clearInterval(interval!);
          interval = null;
        } else {
          io.emit("timer", time);
          console.log(time);
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
