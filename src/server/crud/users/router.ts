import { z } from "zod";
import { router, publicProcedure } from "../../trpc/trpc";
import { getRecentActivitiesForUser } from "./commands/getRecentActivitiesForUser";

export const usersRouter = router({
  getRecentActivitiesForUser: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await getRecentActivitiesForUser(input);
    }),
});
