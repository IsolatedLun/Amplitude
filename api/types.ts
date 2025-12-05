import { IUser } from "@/server/src/routes/types"

export interface IApiEror {
    error: string
}

export interface ISignUpForm {
    username: string,
    password: string,
    repeatPassword: string
}

export interface IEditUserForm {
    username: string,
    password: string
}

// ===

export interface ILoginForm {
    username: string,
    password: string
}

export interface ILoginResponse {
    data: {
        user: IUser,
        token: string
    }
}

export interface IAuthResponse {
    data: {
        user: IUser,
        token: string
    }
}