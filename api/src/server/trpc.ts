import { initTRPC } from "@trpc/server";

export const t = initTRPC.context().create();

export const publicProcedure = t.procedure;
export const router = t.router;
