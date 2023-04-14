import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const PicksRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.pick.findMany();
  }),
});
