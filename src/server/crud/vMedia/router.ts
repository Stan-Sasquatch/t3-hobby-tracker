import type { CreateNewVMediaAndRatingModel } from "../../../crud/vMedia/models";
import {
  CreateNewFilmAndRatingModel,
  CreateNewTvShowAndRatingModel,
} from "../../../crud/vMedia/models";
import { router, publicProcedure } from "../../trpc/trpc";
import { z } from "zod";
import { CreateNewVMediaAndRating } from "./commands/createNewVMediaAndRating";

export const VMediaRouter = router({
  newFilmAndRating: publicProcedure
    .input(CreateNewFilmAndRatingModel)
    .mutation(async ({ input }) => {
      const model: CreateNewVMediaAndRatingModel = {
        ...input,
        vMediaType: "FILM",
      };
      const { data, error } = await CreateNewVMediaAndRating(model);
      return {
        data,
        error,
      };
    }),
  newTvShowAndRating: publicProcedure
    .input(CreateNewTvShowAndRatingModel)
    .mutation(async ({ input }) => {
      const model: CreateNewVMediaAndRatingModel = {
        ...input,
        vMedia: {
          ...input.vMedia,
          release_date: input.vMedia.first_air_date,
          title: input.vMedia.name,
        },
        vMediaType: "TV",
      };

      const { data, error } = await CreateNewVMediaAndRating(model);
      return {
        data,
        error,
      };
    }),
  getAllUserRatings: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.vMediaRating.findMany({
      where: {
        user: {
          id: ctx.session?.user?.id,
        },
      },
      include: { vMedia: true },
      orderBy: { createdAt: "desc" },
    });
  }),
  getFilmById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.vMedia.findUnique({
      where: { id: input },
    });
  }),
});
