import { z } from "zod";
import { PickType } from "@prisma/client";

const submitPickInputSchema = z.object({
  userId: z.string(),
  eventId: z.string(),
  option: z.enum(PickType),
})


import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const PicksRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.pick.findMany();
  }),

  submitPick: publicProcedure.mutation(async ({ ctx, input }) => {
    const { userId, eventId, option } = input;
    const pick = await ctx.prisma.pick.create({
      data: {
        userId,
        eventId,
        option,
      },
    });
    return pick;
  }
});
