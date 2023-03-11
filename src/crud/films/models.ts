import { z } from "zod";

export const MovieDBFilm = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().optional(),
  genre_ids: z.array(z.number()),
  id: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().optional(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export const MovieDBResponse = z.object({
  page: z.number(),
  results: z.array(MovieDBFilm),
  total_pages: z.number(),
  total_results: z.number(),
});

export type MovieDBResponse = z.infer<typeof MovieDBResponse>;
export type MovieDBFilm = z.infer<typeof MovieDBFilm>;
