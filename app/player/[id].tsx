import Clutton from "@/components/clutton/Clutton";
import { ECluttonTheme } from "@/components/clutton/types";
import CenterContainer from "@/components/containers/CenterContainer";
import { ISongCard } from "@/components/songCard/types";
import SongPlayer from "@/components/songPlayer/SongPlayer";
import { ETypographyFontSize, ETypographyTheme } from "@/components/typography/types";
import Typography from "@/components/typography/Typography";
import { local_GetSong } from "@/utils/local";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

const PlayerPage = () => {
    const { id } = useLocalSearchParams();
    const [song, setSong] = useState<ISongCard | null>(null);
    const router = useRouter();

    useEffect(() => {
        local_GetSong(id as string).then(setSong);
    }, [])

    return !song ? (
        <CenterContainer style={styles.errorContainer} alignCenter>
            <Typography 
                theme={ETypographyTheme.Error} 
                fontSize={ETypographyFontSize.Title}
            >
                    Song not found.
            </Typography>

            <Clutton 
                onPress={() => router.replace("/(tabs)/songs")}
                text="Return home"
                theme={ECluttonTheme.Primary}
            />
        </CenterContainer>
    ) : <SongPlayer { ...song } />
};

const styles = StyleSheet.create({
    errorContainer: {
        gap: 20
    }
})

export default PlayerPage;