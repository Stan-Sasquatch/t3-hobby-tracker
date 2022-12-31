import axios from "axios";
import { GoogleVolumesResponse } from "../server/books/models";
import { googleVolumeQueryTypes } from "./models";

export async function authorSearchGoogleVolumes(
  googleApiKey: string,
  volumeSearchText: string,
  authorSearchText: string
) {
  const api = "https://www.googleapis.com/books/v1";

  const query = `volumes?q=${volumeSearchText}+${googleVolumeQueryTypes.author}:${authorSearchText}&key=${googleApiKey}`;

  const response = await axios.get<GoogleVolumesResponse>(`${api}/${query}`);

  const { data } = response;
  GoogleVolumesResponse.parse(data);

  return data;
}
