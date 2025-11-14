import { local_ClearAuthToken, local_getMockLoginUser } from "@/utils/local";
import React, { createContext, useState } from "react";
import { IAuthUser, IAuthUserContext } from "./types";

const AuthUserContext = createContext<IAuthUserContext | null>(null);

const AuthProvider = ({ children } : { children: React.ReactNode }) => {
    const [user, setUser] = useState<IAuthUser | null>(null);

    async function login(v: IAuthUser) {
        const res = await local_getMockLoginUser();
        if(v.username === res.username && v.password === res.password) {
            setUser(v);
            return Promise.resolve();
        }
        else
            return Promise.reject("Invalid username/password.");
    }

    function logout() {
        local_ClearAuthToken();
        setUser(null);
    }
    
    return(
        <AuthUserContext.Provider value={{ user, login, logout }}>
            { children }
        </AuthUserContext.Provider>
    )
};

export { AuthProvider, AuthUserContext };

