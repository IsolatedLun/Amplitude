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

// im forced to use fetch because for some reason, multer cant detect files if i send requests usign axios
export const SongAPI_UploadSong: (data: FormData) => Promise<Response> = (data: FormData) => fetch(
    SERVER_URL + "/songs",
    { method: "POST", body: data }
);

export const SongAPI_UpdateSong: (id: string, data: FormData) => Promise<Response> = (id: string, data: FormData) => fetch(
    SERVER_URL + "/songs/update/" + id,
    { method: "POST", body: data }
);;