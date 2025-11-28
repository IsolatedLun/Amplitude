import WordInput from "@/components/inputs/WordInput";
import SongCard from "@/components/songCard/SongCard";
import { ISongCard } from "@/components/songCard/types";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

const FavoritesTab = () => {
    const [favorites, setFavorites] = useState<ISongCard[]>([]);
    const [searchValue, setSearchValue] = useState("");

    return(
        <View>
            <WordInput 
                onInput={setSearchValue}
                value={searchValue} 
                placeholder="Search your favorite songs..." 
                title=""
            />

            <FlatList 
                style={styles.songContainer}
                contentContainerStyle={styles.songContentContainer}
                data={favorites.filter(x => x.title.startsWith(searchValue))}
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

export default FavoritesTab;