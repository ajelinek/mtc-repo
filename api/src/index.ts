import express from "express";
import { mountTRPCServer } from "./server";

const app = express();
mountTRPCServer(app);

app.use("/api", (req, res) => {
  res.send("Hello World!");
});

app.listen(2021);

export type { AppRouterDefinition } from "./routers";
