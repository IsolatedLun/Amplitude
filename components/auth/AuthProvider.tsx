import { MOCK_USER } from "@/utils/global";
import React, { createContext, useState } from "react";
import { IAuthUser, IAuthUserContext } from "./types";

const AuthUserContext = createContext<IAuthUserContext | null>(null);

const AuthProvider = ({ children } : { children: React.ReactNode }) => {
    const [user, setUser] = useState<IAuthUser | null>(MOCK_USER);

    async function login(v: IAuthUser) {

    }

    function logout() {
        setUser(null);
    }
    
    return(
        <AuthUserContext.Provider value={{ user, login, logout }}>
            { children }
        </AuthUserContext.Provider>
    )
};

export { AuthProvider, AuthUserContext };

