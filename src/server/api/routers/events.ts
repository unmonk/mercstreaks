import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const eventsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.event.findMany({
      include: {
        _count: {
          select: {
            picks: true,
          },
        },
      },
    });
  }),
});
