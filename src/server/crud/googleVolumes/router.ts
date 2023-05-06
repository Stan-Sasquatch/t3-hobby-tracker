import { router, publicProcedure } from "@trpc/trpc";
import { z } from "zod";
import { SearchGoogleVolumes } from "./commands/SearchGoogleVolumes";

export const googleVolumesRouter = router({
  searchGoogleVolumes: publicProcedure
    .input(
      z.object({
        volumeSearchText: z.string(),
        authorSearchText: z.string(),
      })
    )
    .query(async ({ input }) => {
      return await SearchGoogleVolumes(input);
    }),
});
