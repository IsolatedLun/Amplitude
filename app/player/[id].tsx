import { SongAPI_FetchSong } from "@/api/songApi";
import ErrorContainer from "@/components/containers/ErrorContainer";
import LoadingContainer from "@/components/containers/LoadingContainer";
import SongPlayer from "@/components/songPlayer/SongPlayer";
import { useGetRequest } from "@/hooks/request";
import { ISong } from "@/server/src/routes/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet } from "react-native";

const PlayerPage = () => {
    const { id } = useLocalSearchParams();
    const { data, loading, error } = useGetRequest<ISong>(fetchSong(id as string), null)
    const router = useRouter();

    function fetchSong(_id: string) {
        return () => SongAPI_FetchSong(_id);
    }

    return loading
    ? <LoadingContainer />
    : error
        ? <ErrorContainer goBackFn={() => router.replace("/(tabs)/songs")} />
        : <SongPlayer { ...data } />
};

const styles = StyleSheet.create({
    errorContainer: {
        gap: 20
    }
})

export default PlayerPage;