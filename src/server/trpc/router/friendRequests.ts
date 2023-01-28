import { router, publicProcedure } from "../trpc";
import { CompleteStatusEnum } from "../../../connections/models";
import { contextProps } from "@trpc/react-query/dist/internals/context";
import { z } from "zod";

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
    .mutation(({ ctx, input }) => {
      const { id, status } = input;
      return ctx.prisma.friendRequest.update({
        where: {
          id,
        },
        data: {
          status,
        },
      });
    }),
});
