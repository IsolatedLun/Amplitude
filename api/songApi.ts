import { ISong, ISongPreview } from "@/server/src/routes/types";
import { SERVER_URL } from "@/utils/global";
import axios from "axios";

const api = axios.create({
    baseURL: SERVER_URL + "/songs",
    timeout: 5000,
});

export const SongAPI_FetchSongs: () => Promise<ISongPreview[]> = () => api.get("", {
    method: "GET"
})

export const SongAPI_FetchSong: (id: string) => Promise<ISong> = (id: string) => api.get(`/${id}`, {
    method: "GET"
})

export const SongAPI_UploadSong: (data: FormData) => Promise<void> = (data: FormData) => api.post("", {
    method: "POST",
    body: data
});

export const SongAPI_UpdateSong: (data: FormData) => Promise<void> = (data: FormData) => api.post("", {
    method: "PUT",
    body: data
})