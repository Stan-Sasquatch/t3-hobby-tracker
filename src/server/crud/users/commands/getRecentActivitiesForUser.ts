export async function getRecentActivitiesForUser(id: string) {
  if (!id) {
    throw new Error("id must be a valid string");
  }

  const user = await prisma?.user.findUnique({
    where: { id },
    include: {
      bookRatings: {
        include: { book: true },
        orderBy: { createdAt: "desc" },
        take: 3,
      },
    },
  });

  if (user == null || user == undefined) {
    throw new Error(`user with id:${id} not found`);
  }

  return user;
}
