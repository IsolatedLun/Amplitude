import WordInput from "@/components/inputs/WordInput";
import SongCard from "@/components/songCard/SongCard";
import { ISongCard } from "@/components/songCard/types";
import { local_GetSongs } from "@/utils/local";
import { useFocusEffect } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

const SongsTab = () => {
    const [songs, setSongs] = useState<ISongCard[]>([]);
    const [searchValue, setSearchValue] = useState("");

    useFocusEffect(() => {
        local_GetSongs().then(setSongs);
    })

    return(
        <View>
            <WordInput 
                onInput={setSearchValue}
                value={searchValue} 
                placeholder="Search song..." 
                title=""
            />

            <FlatList 
                style={styles.songContainer}
                contentContainerStyle={styles.songContentContainer}
                data={songs.filter(x => x.title.startsWith(searchValue))}
                renderItem={x => <SongCard {...x.item} />}
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