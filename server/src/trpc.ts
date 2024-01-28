import { initTRPC , inferAsyncReturnType } from "@trpc/server";
import { createContext } from "./context";

export type context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<context>().create()

export const middleware = t.middleware;
export const router = t.router;

export const publicProcedure = t.procedure