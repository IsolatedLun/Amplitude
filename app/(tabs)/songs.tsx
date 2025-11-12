import WordInput from "@/components/inputs/WordInput";
import SongCard from "@/components/songCard/SongCard";
import { ISongCard } from "@/components/songCard/types";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

const SongsTab = () => {
    const [songs, setSongs] = useState<ISongCard[]>([
        {
            id: "1",
            image: "https://i.pinimg.com/474x/ca/ae/e0/caaee099b79ee7116d3f79e33c935481.jpg",
            audio: "",
            title: "Random ass song",
            author: "123"
        }
    ])

    return(
        <View>
            <WordInput value="" placeholder="Search song..." title="" />

            <FlatList 
                style={styles.songContainer}
                data={songs}
                renderItem={x => <SongCard {...x.item} />}
            />
        </View> 
    )
};

const styles = StyleSheet.create({
    songContainer: {
        marginBlockStart: 20,
    }
})

export default SongsTab;