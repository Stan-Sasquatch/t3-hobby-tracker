import { prisma } from "../../db/client";

export default async function initialiseConnections(user_id: string) {
  console.log("initialising connection for new user");

  await prisma.friendRequest.create({
    data: {
      user_id,
      friend_id: "cldfvs3zo0000sokwz9zpg6ys",
      status: "PENDING",
    },
  });
}
