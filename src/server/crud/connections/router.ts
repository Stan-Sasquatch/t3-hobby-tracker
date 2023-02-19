import { router, publicProcedure } from "../../trpc/trpc";
import { CompleteStatusEnum } from "../../../crud/connections/models";
import { z } from "zod";
import { handleFriendRequestUpdate } from "./commands/handleFriendRequestUpdate";

export const connectionsRouter = router({
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
  updatePendingRequest: publicProcedure
    .input(
      z.object({
        status: CompleteStatusEnum,
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await handleFriendRequestUpdate(input);
    }),
});
