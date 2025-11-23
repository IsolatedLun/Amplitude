import WordInput from "@/components/inputs/WordInput";
import SongCard from "@/components/songCard/SongCard";
import { ISongCard } from "@/components/songCard/types";
import { local_DeleteSong, local_GetSongs } from "@/utils/local";
import { useFocusEffect } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

const SongsTab = () => {
    const [songs, setSongs] = useState<ISongCard[]>([]);
    const [searchValue, setSearchValue] = useState("");

    useFocusEffect(() => {
        local_GetSongs().then(setSongs);
    });

    async function deleteSong(id: string) {
        const res = await local_DeleteSong(id);
        setSongs(res);
    }

    return(
        <View>
            <WordInput 
                onInput={setSearchValue}
                value={searchValue} 
                placeholder="Search songs..." 
                title=""
            />

            <FlatList 
                style={styles.songContainer}
                contentContainerStyle={styles.songContentContainer}
                data={songs.filter(x => x.title.startsWith(searchValue))}
                renderItem={x => <SongCard {...x.item} onDelete={deleteSong} />}
            />
        </View> 
    )
};

const styles = StyleSheet.create({
    songContainer: {
        marginBlockStart: 20,
        gap: 20
    },
    songContentContainer: {
        gap: 32
    }
})

export default SongsTab;