import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { Express } from "express";
import { appRouter } from "../routers";
import { createContext } from "./trpc";
export { publicProcedure, router, t } from "./trpc";

export function mountTRPCServer(app: Express) {
  app.use(
    "/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
}
