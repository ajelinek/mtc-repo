import express from "express";
import { mountTRPCServer } from "./server";

const app = express();
mountTRPCServer(app);

app.listen(2021);

export type { AppRouterDefinition } from "./routers";
