import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./routers";
import cors from "cors";

const server = createHTTPServer({
  middleware: cors(),
  router: appRouter,
});

server.listen(2021);

export type { AppRouterDefinition } from "./routers";
