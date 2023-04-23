import { prisma } from "@db/client";
import { env } from "@env/server.mjs";
export default async function initialiseConnections(toUserId: string) {
  if (!env.NEXT_PUBLIC_STAN_USER_ID) {
    console.log("Stan user not set, skipping initial friend request");
    return;
  }

  console.log("initialising connection for new user");
  await prisma.friendRequest.create({
    data: {
      toUserId,
      fromUserId: env.NEXT_PUBLIC_STAN_USER_ID,
      status: "PENDING",
    },
  });
}
