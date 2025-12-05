import { UserAPI_Auth } from "@/api/userApi";
import { IUser } from "@/server/src/routes/types";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useEffect, useState } from "react";
import { IAuthUserContext } from "./types";

const AuthUserContext = createContext<IAuthUserContext | null>(null);

const AuthProvider = ({ children } : { children: React.ReactNode }) => {
    const router = useRouter();
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {        
        const tok = SecureStore.getItem("tok");
        if(tok) {
            UserAPI_Auth(tok)
                .then((res) => login(res.data.user, tok))
                .catch(() => SecureStore.deleteItemAsync("tok"));
        }
    }, []);

    async function login(v: IUser, tok: string) {
        setUser(v);
        await SecureStore.setItemAsync("tok", tok);
        router.push("/(tabs)/songs");
    }

    async function logout() {
        await SecureStore.deleteItemAsync("tok");
        setUser(null);
    }
    
    return(
        <AuthUserContext.Provider value={{ user, login, logout }}>
            { children }
        </AuthUserContext.Provider>
    )
};

export { AuthProvider, AuthUserContext };

