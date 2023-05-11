import express from "express";
import { mountSockets, mountTRPCServer } from "./server";
import cors from "cors";
import http from "http";

const app = express();
app.use(cors());
mountTRPCServer(app);

app.use("/api", (req, res) => {
  res.send("Hello World!");
});

const server = http.createServer(app);

mountSockets(server);

server.listen(2021, () => {
  console.log("Server started on port 2021");
});

export type { AppRouterDefinition } from "./routers";
