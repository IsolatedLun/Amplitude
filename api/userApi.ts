import { SERVER_URL } from "@/utils/global";
import axios from "axios";
import { IAuthResponse, IEditUserForm, ILoginForm, ILoginResponse, ISignUpForm } from "./types";

const api = axios.create({
    baseURL: SERVER_URL + "/users",
    timeout: 5000,
});

export const UserAPI_Auth = (tok: string): Promise<IAuthResponse> => api.post("/auth", {},  { headers: { "Authorization": "Bearer " + tok } });
export const UserAPI_Login = (data: ILoginForm): Promise<ILoginResponse> => api.post("/login", data);
export const UserAPI_SignUp = (data: ISignUpForm): Promise<void> => api.post("/signup", data);
export const UserAPI_EditUser = (data: IEditUserForm, tok: string): Promise<ILoginResponse> => api.post(
    "/edit", data, { headers: { "Authorization": "Bearer " + tok } }
);