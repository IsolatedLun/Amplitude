import { IAuthUser } from "@/components/auth/types";
import * as YUP from "yup";

export const ENV_PORT = process.env.PORT || 3000;
export const ENV_HOST = process.env.LOCAL_IP || "192.168.1.100";
export const SERVER_URL = `http://${ENV_HOST}:${ENV_PORT}`;

export const MOCK_USER: IAuthUser = { username: "crazy", password: "loool" };
export const USER_VALIDATION_SCHEMA = YUP.object().shape({
    username: YUP.string().required(),
    password: YUP.string().min(4).required()
});