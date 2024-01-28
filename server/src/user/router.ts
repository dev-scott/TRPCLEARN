import { z } from "zod";

import { router, publicProcedure } from "../trpc";

import { User } from "./types";
import { users } from "./db";

export const userRouter = router({
  getUsers: publicProcedure.query(() => {
    return users;
  }),
  getUserById: publicProcedure
    .input((val: unknown) => {
      if (typeof val === "string") return val;
      throw new Error(`Invalid input : ${typeof val}`);
    })
    .query((req: any) => {
      const { input } = req;
      const user = users.find((user) => user.id === input);

      return user;
    }),
  createUser: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation((req: any) => {
      const { input } = req;

      const user: User = {
        id: `${Math.random()}`,
        name: input.name,
      };
      users.push(user);
      return user;
    }),
});
