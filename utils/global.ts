import { IAuthUser } from "@/components/auth/types";
import * as YUP from "yup";

export const MOCK_USER: IAuthUser = { username: "crazy", password: "loool" };
export const USER_VALIDATION_SCHEMA = YUP.object().shape({
    username: YUP.string().required(),
    password: YUP.string().min(4).required()
});