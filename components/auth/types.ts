import { IUser } from "@/server/src/routes/types"

export interface IAuthUserContext {
    user: IUser | null,

    login: (v: IUser, tok: string) => Promise<void>,
    logout: () => void
}