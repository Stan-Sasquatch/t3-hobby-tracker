import type { CreateNewVMediaAndRatingModel } from "@clientCrud/vMedia/models";
import {
  CreateNewFilmAndRatingModel,
  CreateNewTvShowAndRatingModel,
  ZVisualMediaType,
} from "@clientCrud/vMedia/models";
import { router, publicProcedure } from "@trpc/trpc";
import { z } from "zod";
import { CreateNewVMediaAndRating } from "./commands/createNewVMediaAndRating";

export const VMediaRouter = router({
  newFilmAndRating: publicProcedure
    .input(CreateNewFilmAndRatingModel)
    .mutation(async ({ input }) => {
      const model: CreateNewVMediaAndRatingModel = {
        ...input,
        vMedia: input.film,
        vMediaType: "FILM",
      };
      const { data, message } = await CreateNewVMediaAndRating(model);
      return {
        data,
        message,
      };
    }),
  newTvShowAndRating: publicProcedure
    .input(CreateNewTvShowAndRatingModel)
    .mutation(async ({ input }) => {
      const model: CreateNewVMediaAndRatingModel = {
        ...input,
        vMedia: {
          ...input.tvShow,
          release_date: input.tvShow.first_air_date,
          title: input.tvShow.name,
        },
        vMediaType: "TV",
      };

      const { data, message } = await CreateNewVMediaAndRating(model);
      return {
        data,
        message,
      };
    }),
  getAllUserRatings: publicProcedure
    .input(ZVisualMediaType)
    .query(({ input, ctx }) => {
      return ctx.prisma.vMediaRating.findMany({
        where: {
          user: {
            id: ctx.session?.user?.id,
          },
          vMedia: {
            visualMediaType: input,
          },
        },
        include: { vMedia: true },
        orderBy: { createdAt: "desc" },
      });
    }),
  getVMediaById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.vMedia.findUnique({
      where: { id: input },
    });
  }),
});
