import { SongAPI_FetchSongs } from "@/api/songApi";
import { ISongPreview } from "@/api/types";
import ErrorContainer from "@/components/containers/ErrorContainer";
import LoadingContainer from "@/components/containers/LoadingContainer";
import WordInput from "@/components/inputs/WordInput";
import SongCard from "@/components/songCard/SongCard";
import { useGetRequest } from "@/hooks/request";
import { useFocusEffect } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

const SongsTab = () => {
    const { data, loading, error, retryFn } = useGetRequest<ISongPreview[]>(SongAPI_FetchSongs, []);
    const [searchValue, setSearchValue] = useState("");

    useFocusEffect(() => {
        if(data.length == 0)
            retryFn();
    })

    return loading 
    ? <LoadingContainer />
    : error
    ? <ErrorContainer retryFn={retryFn} />
    : (
         (
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
                data={data.filter(x => x.title.startsWith(searchValue))}
                renderItem={x => <SongCard {...x.item} />}
            />
        </View>
    )
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