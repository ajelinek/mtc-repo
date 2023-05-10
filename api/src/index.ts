import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./routers";

const server = createHTTPServer({
  router: appRouter,
});

server.listen(2021);

export type { AppRouterDefinition } from "./routers";
