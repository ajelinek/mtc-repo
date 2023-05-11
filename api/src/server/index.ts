import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { Express } from "express";
import { appRouter } from "../routers";
import { createContext } from "./trpc";
export { publicProcedure, router, t } from "./trpc";
import socketListeners from "./sockets";
import { Server } from "socket.io";
import http from "http";
import { myServer } from "../types";

export function mountTRPCServer(app: Express) {
  app.use(
    "/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
}

//create a mount function for sockets that takes a socket.io server instance
export function mountSockets(server: http.Server) {
  const io: myServer = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    socketListeners(socket, io);

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
}
