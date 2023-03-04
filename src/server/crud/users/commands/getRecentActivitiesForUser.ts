export async function getRecentActivitiesForUser(id: string) {
  const user = await prisma?.user.findUnique({ where: { id } });

  return user;
}
