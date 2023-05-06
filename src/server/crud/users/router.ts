import { z } from "zod";
import { router, publicProcedure } from "@trpc/trpc";
import { getRecentActivitiesForUser } from "./commands/getRecentActivitiesForUser";

export const usersRouter = router({
  getRecentActivitiesForUser: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await getRecentActivitiesForUser(input);
    }),
  getFriendsForUser: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.user.findUnique({
      where: { id: ctx.session?.user?.id },
      include: {
        userFriends: true,
      },
    });
  }),
});
