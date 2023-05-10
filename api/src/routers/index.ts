import { router } from "../server";
import { meetings } from "./meetings";

export const appRouter = router({
  meetings,
});

export type AppRouterDefinition = typeof appRouter;
