import { IAuthUser } from "@/components/auth/types";
import { ISongCard } from "@/components/songCard/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';

// fetching/deleting songs
export async function local_GetSongs(): Promise<ISongCard[]> {
    const _res = await AsyncStorage.getItem("songs");
    const res: ISongCard[] = _res ? JSON.parse(_res) : [];
    
    return res;
}

export async function local_GetSong(id: string): Promise<ISongCard | null> {
    const _res = await AsyncStorage.getItem("songs");
    const res: ISongCard[] = _res ? JSON.parse(_res) : [];
    
    return res.find(x => x.id === id) ?? null;
}

export async function local_UploadSong(x: ISongCard): Promise<void> {
    const _res = await AsyncStorage.getItem("songs");
    const res: ISongCard[] = _res ? JSON.parse(_res) : [];
    res.push(x);
    
    return AsyncStorage.setItem("songs", JSON.stringify(res));
}

export async function local_ClearSongs() {
    AsyncStorage.removeItem("songs");
}

// auth
export async function local_getMockLoginUser(): Promise<IAuthUser> {
    const res = await SecureStore.getItemAsync("user");
    if(res)
        return JSON.parse(res);
    return Promise.reject();
}

export async function local_editMockUser(v: IAuthUser) {
    return await SecureStore.setItemAsync("user", JSON.stringify(v));
}