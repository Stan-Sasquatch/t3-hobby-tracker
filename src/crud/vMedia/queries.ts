import axios from "axios";
import { MovieDBFilmResponse, MovieDBTvShowResponse } from "./models";

const api = "https://api.themoviedb.org/3/search";
const apiKey = process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY;

export async function searchMovieDBFilm(filmSearchText: string, page = 1) {
  const query = GetMovieDBSearchQuery(filmSearchText, page);
  const response = await axios.get<MovieDBFilmResponse>(
    `${api}/movie?${query}`
  );

  const { data } = response;
  MovieDBFilmResponse.parse(data);
  return data;
}

export async function searchMovieDBTvShow(tvSearchText: string, page = 1) {
  const query = GetMovieDBSearchQuery(tvSearchText, page);
  const response = await axios.get<MovieDBTvShowResponse>(`${api}/tv?${query}`);

  const { data } = response;
  MovieDBTvShowResponse.parse(data);

  return data;
}
function GetMovieDBSearchQuery(searchText: string, page: number) {
  return `api_key=${apiKey}&query=${searchText}&page=${page}`;
}
