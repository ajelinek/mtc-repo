import { router } from "../server/trpc";
import { meetings } from "./meetings";

export const appRouter = router({
  meetings,
});

export type AppRouterDefinition = typeof appRouter;
