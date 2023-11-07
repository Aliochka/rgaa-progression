import * as trpc from "@trpc/server";
import { z } from "zod";
import type { Context } from "../context";

export const appRouter = trpc
  .router<Context>()
  .query("getTests", {
    async resolve({ ctx }) {
      return await ctx.prisma.test.findMany();
    },
  })
  .mutation("createTest", {
    input: z.object({
      text: z.string().min(3).max(245),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.test.create({
        data: {
          text: input.text,
        },
      });
    },
  })
  .mutation("deleteTest", {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.test.delete({
        where: {
          id: input.id,
        },
      });
    },
  });

export type AppRouter = typeof appRouter;
