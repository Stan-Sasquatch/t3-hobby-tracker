import { VisualMediaType } from "@prisma/client";
import { z } from "zod";
import type { Navigation } from "../common/models";

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

export const MovieDBBaseResponse = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().optional().nullable(),
  genre_ids: z.array(z.number()),
  id: z.number(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().optional().nullable(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export const MovieDBFilm = MovieDBBaseResponse.extend({
  original_title: z.string(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean(),
});

export const MovieDBVMedia = MovieDBBaseResponse.extend({
  release_date: z.string(),
  title: z.string(),
  original_title: z.string().optional(),
  video: z.boolean().optional(),
  origin_country: z.array(z.string()).optional(),
});

export const MovieDBFilmResponse = z.object({
  page: z.number(),
  results: z.array(MovieDBFilm),
  total_pages: z.number(),
  total_results: z.number(),
});

export type MovieDBFilmResponse = z.infer<typeof MovieDBFilmResponse>;
export type MovieDBFilm = z.infer<typeof MovieDBFilm>;

export const MovieDBTvShow = MovieDBBaseResponse.extend({
  origin_country: z.array(z.string()),
  original_name: z.string(),
  first_air_date: z.string(),
  name: z.string(),
});

export const MovieDBTvShowResponse = z.object({
  page: z.number(),
  results: z.array(MovieDBTvShow),
  total_pages: z.number(),
  total_results: z.number(),
});

export type MovieDBTvShowResponse = z.infer<typeof MovieDBTvShowResponse>;
export type MovieDBTvShow = z.infer<typeof MovieDBTvShow>;

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
