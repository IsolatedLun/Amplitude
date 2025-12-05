import { SERVER_URL } from "@/utils/global";
import axios from "axios";

const api = axios.create({
    baseURL: SERVER_URL,
    timeout: 5000,
});

export const IndexAPI_Reset = (): Promise<void> => api.post("/reset", {});