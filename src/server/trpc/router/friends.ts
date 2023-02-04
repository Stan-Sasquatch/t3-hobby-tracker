import { router, publicProcedure } from "../trpc";

export const friendsRouter = router({
  getAllFriendsForUser: publicProcedure.query(({ ctx }) => {
    const user_id = ctx.session?.user?.id;
    return ctx.prisma.friend.findMany({
      where: {
        user_id,
      },
      include: {
        friend: true,
      },
    });
  }),
});
