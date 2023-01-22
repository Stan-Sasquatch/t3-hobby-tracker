import { prisma } from "../../db/client";

export default async function initialiseConnections(id: string) {
  console.log("initialising connection for new user");
  // initialise every new user with Stephen Percival as a connection!
  await prisma.user.update({
    where: {
      id,
    },
    data: {
      connections: { set: [{ id: "cld7tzqaf000008l2bpb3azz8" }] },
    },
  });
}
