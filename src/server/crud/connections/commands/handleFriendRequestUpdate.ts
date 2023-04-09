import type { CompleteStatusEnum } from "@clientCrud/connections/models";
import { prisma } from "@db/client";

export async function handleFriendRequestUpdate(input: {
  id: string;
  status: CompleteStatusEnum;
}) {
  const { id, status } = input;

  const request = await prisma.friendRequest.findUnique({
    where: {
      id,
    },
  });

  if (!request) {
    throw new Error(`Can't find friend request with id ${id}`);
  }

  await prisma.friendRequest.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });

  if (status === "CONFIRMED") {
    await prisma.friend.createMany({
      data: [
        { user_id: request.fromUserId, friend_id: request.toUserId },
        { user_id: request.toUserId, friend_id: request.fromUserId },
      ],
    });
  }
  return { success: true };
}
