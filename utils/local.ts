import { ISongCard } from "@/components/songCard/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

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