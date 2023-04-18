import { z } from "zod";
import { PickType } from "@prisma/client";
import { PickTypeSchema } from "@/prisma/generated/zod";

const submitPickInputSchema = z.object({
  userId: z.string(),
  eventId: z.string(),
  option: PickTypeSchema,
});

const deselectPickInputSchema = z.object({
  userId: z.string(),
  eventId: z.string(),
});

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const PicksRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.pick.findMany();
  }),

  submitPick: publicProcedure.mutation(async ({ ctx, input: inputData }) => {
    const input = submitPickInputSchema.parse(inputData);
    const { userId, eventId, option } = input;
    const pick = await ctx.prisma.pick.create({
      data: {
        userId,
        eventId,
        option,
      },
    });
    return pick;
  }),

  deselectPick: publicProcedure.mutation(async ({ ctx, input: inputData }) => {
    const input = deselectPickInputSchema.parse(inputData);
    const { userId, eventId } = input;

    const pick = await ctx.prisma.pick.update({
      where: { userId_eventId: { userId, eventId } },
      data: { option: PickType.NONE },
    });
    return pick;
  }),
});
