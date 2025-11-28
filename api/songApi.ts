import { SERVER_URL } from "@/utils/global";
import axios from "axios";
import { ISong, ISongPreview } from "./types";

const api = axios.create({
    baseURL: SERVER_URL + "/songs",
    timeout: 5000,
});

export const SongAPI_FetchSongs: () => Promise<ISongPreview[]> = () => api.get("", {
    method: "GET"
})

export const SongAPI_FetchSong: (id: string) => Promise<ISong> = (id: string) => api.get(id, {
    method: "GET"
})