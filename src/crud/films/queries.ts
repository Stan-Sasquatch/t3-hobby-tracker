import axios from "axios";
import { MovieDBResponse } from "./models";

export async function authorSearchGoogleVolumes(
  filmSearchText: string,
  page = 1
) {
  const apiKey = process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY;
  const api = "https://api.themoviedb.org/3/search/movie";
  const query = `api_key=${apiKey}&query=${filmSearchText}&page=${page}`;

  const response = await axios.get<MovieDBResponse>(`${api}?${query}`);

  const { data } = response;
  MovieDBResponse.parse(data);

  return data;
}
