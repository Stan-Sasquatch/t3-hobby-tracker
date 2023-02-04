import { router, publicProcedure } from "../trpc";
import { CompleteStatusEnum } from "../../../connections/models";
import { z } from "zod";
import { handleFriendRequestUpdate } from "../../connections/commands/handleFriendRequestUpdate";

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
