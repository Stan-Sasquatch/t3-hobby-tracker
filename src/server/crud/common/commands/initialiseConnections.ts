import { prisma } from "../../../db/client";

export default async function initialiseConnections(toUserId: string) {
  console.log("initialising connection for new user");

  await prisma.friendRequest.create({
    data: {
      toUserId,
      fromUserId: "cldfvs3zo0000sokwz9zpg6ys",
      status: "PENDING",
    },
  });
}
