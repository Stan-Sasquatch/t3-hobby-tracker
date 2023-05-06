import { router, publicProcedure } from "@trpc/trpc";
import { z } from "zod";
import {
  SearchMovieDbMovie,
  SearchMovieDbTvShow,
} from "./commands/SearchMovieDbMedia";

export const movieDbRouter = router({
  searchMovieDbFilm: publicProcedure
    .input(
      z.object({
        searchText: z.string(),
        page: z.number().optional(),
      })
    )
    .query(async ({ input }) => {
      return await SearchMovieDbMovie(input);
    }),
  searchMovieDbTvShow: publicProcedure
    .input(
      z.object({
        searchText: z.string(),
        page: z.number().optional(),
      })
    )
    .query(async ({ input }) => {
      return await SearchMovieDbTvShow(input);
    }),
});
