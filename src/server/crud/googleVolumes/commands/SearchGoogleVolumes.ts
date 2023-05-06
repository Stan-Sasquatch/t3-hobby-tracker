import axios from "axios";
import { googleVolumeQueryTypes, GoogleVolumesResponse } from "../models";

export async function SearchGoogleVolumes({
  volumeSearchText,
  authorSearchText,
}: {
  volumeSearchText: string;
  authorSearchText: string;
}) {
  const googleApiKey = process.env.GOOGLE_BOOKS_API_KEY;
  const api = "https://www.googleapis.com/books/v1";

  const query = `volumes?q=${volumeSearchText}+${googleVolumeQueryTypes.author}:${authorSearchText}&key=${googleApiKey}`;

  const response = await axios.get<GoogleVolumesResponse>(`${api}/${query}`);

  const { data } = response;
  GoogleVolumesResponse.parse(data);

  return data;
}
