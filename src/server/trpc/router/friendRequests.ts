import { router, publicProcedure } from "../trpc";

export const friendRequestsRouter = router({
  getAllFriendRequests: publicProcedure.query(({ ctx }) => {
    const id = ctx.session?.user?.id;
    return ctx.prisma.friendRequest.findMany({
      where: {
        OR: [
          {
            fromUser: {
              id,
            },
          },
          {
            toUser: {
              id,
            },
          },
        ],
      },
      include: {
        fromUser: true,
        toUser: true,
      },
    });
  }),
});
