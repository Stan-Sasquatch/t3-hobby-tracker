import { VisualMediaType } from "@prisma/client";
import { z } from "zod";

export type mediaType = "film" | "tv";

export const MovieDBBaseResponse = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().optional(),
  genre_ids: z.array(z.number()),
  id: z.number(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().optional(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export const MovieDBFilm = MovieDBBaseResponse.extend({
  original_title: z.string(),
  poster_path: z.string().optional(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean(),
});

export const MovieDBVMedia = MovieDBBaseResponse.extend({
  release_date: z.string(),
  title: z.string(),
  original_title: z.string().optional(),
  poster_path: z.string().optional(),
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

export const MovieDBTVShow = MovieDBBaseResponse.extend({
  origin_country: z.array(z.string()),
  original_name: z.string(),
  first_air_date: z.string(),
  name: z.string(),
});

export const MovieDBTVShowResponse = z.object({
  page: z.number(),
  results: z.array(MovieDBTVShow),
  total_pages: z.number(),
  total_results: z.number(),
});

export type MovieDBTVShowResponse = z.infer<typeof MovieDBTVShowResponse>;
export type MovieDBTVShow = z.infer<typeof MovieDBTVShow>;

export const CreateNewFilmAndRatingModel = z.object({
  userEmail: z.string(),
  vMedia: MovieDBFilm,
  rating: z.number(),
});

export type CreateNewFilmAndRatingModel = z.infer<
  typeof CreateNewFilmAndRatingModel
>;

export const CreateNewTvShowAndRatingModel = z.object({
  userEmail: z.string(),
  vMedia: MovieDBTVShow,
  rating: z.number(),
});

export type CreateNewTvShowAndRatingModel = z.infer<
  typeof CreateNewTvShowAndRatingModel
>;

export const CreateNewVMediaAndRatingModel = z.object({
  userEmail: z.string(),
  vMedia: MovieDBVMedia,
  rating: z.number(),
  vMediaType: z.nativeEnum(VisualMediaType),
});

export type CreateNewVMediaAndRatingModel = z.infer<
  typeof CreateNewVMediaAndRatingModel
>;
