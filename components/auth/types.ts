export interface IAuthUser {
    username: string,
    password: string
}

export interface IAuthUserContext {
    user: IAuthUser | null,

    login: (v: IAuthUser) => Promise<void>,
    logout: () => void
}