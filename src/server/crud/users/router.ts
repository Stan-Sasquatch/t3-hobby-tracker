import { z } from "zod";
import { router, publicProcedure } from "../../trpc/trpc";

export const usersRouter = router({
  getRecentUserActivities: publicProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
      return ctx.prisma.book.findUnique({
        where: { id: input },
      });
    }),
});
