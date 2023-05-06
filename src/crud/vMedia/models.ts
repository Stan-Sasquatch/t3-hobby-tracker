import { VisualMediaType } from "@prisma/client";
import { z } from "zod";
import type { Navigation } from "../common/models";
import {
  MovieDBFilm,
  MovieDBTvShow,
  MovieDBVMedia,
} from "@serverCrud/movieDb/models";

type vMediaRoutes = "Create" | "All";
export const vMediaNavigation: Navigation<vMediaRoutes> = {
  Create: {
    path: "/create",
    title: "New Rating",
  },
  All: {
    path: "",
    title: "All Visual Media Ratings",
  },
};

export const vMediaTypeText = {
  FILM: "Film",
  TV: "TV Show",
} satisfies Record<VisualMediaType, string>;
export const ZVisualMediaType = z.nativeEnum(VisualMediaType);

export const CreateNewFilmAndRatingModel = z.object({
  userEmail: z.string(),
  film: MovieDBFilm,
  rating: z.number(),
});

export type CreateNewFilmAndRatingModel = z.infer<
  typeof CreateNewFilmAndRatingModel
>;

export const CreateNewTvShowAndRatingModel = z.object({
  userEmail: z.string(),
  tvShow: MovieDBTvShow,
  rating: z.number(),
});

export type CreateNewTvShowAndRatingModel = z.infer<
  typeof CreateNewTvShowAndRatingModel
>;

export const CreateNewVMediaAndRatingModel = z.object({
  userEmail: z.string(),
  vMedia: MovieDBVMedia,
  rating: z.number(),
  vMediaType: ZVisualMediaType,
});

export type CreateNewVMediaAndRatingModel = z.infer<
  typeof CreateNewVMediaAndRatingModel
>;
