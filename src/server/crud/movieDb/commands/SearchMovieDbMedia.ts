import axios from "axios";
import { env } from "@env/server.mjs";
import { MovieDBFilmResponse, MovieDBTvShowResponse } from "../models";

const api = "https://api.themoviedb.org/3/search";
const apiKey = env.MOVIE_DB_API_KEY;
export async function SearchMovieDbMovie({
  searchText,
  page = 1,
}: {
  searchText: string;
  page?: number;
}) {
  const query = GetMovieDbSearchQuery(searchText, page);
  const response = await axios.get<MovieDBFilmResponse>(
    `${api}/movie?${query}`
  );

  const { data } = response;
  MovieDBFilmResponse.parse(data);
  return data;
}

export async function SearchMovieDbTvShow({
  searchText,
  page = 1,
}: {
  searchText: string;
  page?: number;
}) {
  const query = GetMovieDbSearchQuery(searchText, page);
  const response = await axios.get<MovieDBTvShowResponse>(`${api}/tv?${query}`);

  const { data } = response;
  MovieDBTvShowResponse.parse(data);

  return data;
}
function GetMovieDbSearchQuery(searchText: string, page: number) {
  return `api_key=${apiKey}&query=${searchText}&page=${page}`;
}
