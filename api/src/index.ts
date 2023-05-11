import express from "express";
import { mountTRPCServer } from "./server";
import cors from "cors";

const app = express();
app.use(cors());
mountTRPCServer(app);

app.use("/api", (req, res) => {
  res.send("Hello World!");
});

app.listen(2021);

export type { AppRouterDefinition } from "./routers";
