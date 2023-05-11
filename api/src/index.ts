<<<<<<< HEAD
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./routers";
import cors from "cors";

const server = createHTTPServer({
  middleware: cors(),
  router: appRouter,
=======
import express from "express";
import { mountTRPCServer } from "./server";

const app = express();
mountTRPCServer(app);

app.use("/api", (req, res) => {
  res.send("Hello World!");
>>>>>>> 37-api-restructure-and-file-breakout
});

app.listen(2021);

export type { AppRouterDefinition } from "./routers";
