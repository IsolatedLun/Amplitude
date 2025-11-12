import { formatToMinutes } from '@/utils/funcs';
import Slider from '@react-native-community/slider';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { useRouter } from 'expo-router';
import { useContext } from 'react';
import { Image, StyleSheet, View } from "react-native";
import CenterContainer from "../containers/CenterContainer";
import IconButton from '../iconButton/IconButton';
import { EIconButtonSize, EIconButtonTheme } from '../iconButton/types';
import { ColorSchemeContext } from '../scheme/ColorSchemeProvider';
import { ISongCard } from "../songCard/types";
import Typography from "../typography/Typography";
import { ETypographyFontSize, ETypographyTheme } from '../typography/types';

const SongPlayer = (props: ISongCard) => {
    const router = useRouter();
    const player = useAudioPlayer(props.audio);
    const status = useAudioPlayerStatus(player);
    const { state: { themes } } = useContext(ColorSchemeContext)!;

    function handlePlayPress() {
        if(status.playing)
            player.pause();
        else
            player.play();
    }

    function handleLoopPress() {
        player.loop = !player.loop;
    }

    function handleGoBack() {
        router.replace("/(tabs)/songs");
    }

    function handleVolumePress() {
        player.muted = !player.muted;
    }

    return(
        <>
            <Image 
                source={{ uri: props.image }} 
                style={styles.backgroundImage} 
                blurRadius={32}
            />
            <CenterContainer style={styles.container}>
                <View style={styles.upperControlsContainer}>
                    <IconButton 
                        name="arrow-left"
                        theme={EIconButtonTheme.Transparent}
                        onPress={handleGoBack}
                    />
                    <IconButton 
                        name="dots-vertical"
                        theme={EIconButtonTheme.Transparent}
                        onPress={handleGoBack}
                    />
                </View>
                <View style={styles.contentContainer}>
                    <Image source={{ uri: props.image }} style={styles.thumbnailImage} />
                    <View style={styles.contentTextContainer}>
                        <Typography numberofLines={2} fontSize={ETypographyFontSize.Title}>{ props.title }</Typography>
                        <Typography theme={ETypographyTheme.Muted}>{ props.author }</Typography>
                    </View>
                </View>
                <View style={styles.timeContainer}>
                    <Slider
                        thumbTintColor={themes.sliderPrimary.color!}
                        minimumTrackTintColor={themes.sliderPrimary.color!}
                        maximumTrackTintColor={themes.sliderPrimary.backgroundColor}
                        onValueChange={v => player.seekTo(v * status.duration)}

                        value={(status.currentTime / status.duration)}
                        minimumValue={0} 
                        maximumValue={1}
                    />

                    <View style={styles.timeContentContainer}>
                        <Typography>{ formatToMinutes(status.currentTime) }</Typography>
                        <Typography>{ formatToMinutes(status.duration) }</Typography>
                    </View>
                </View>
                <View style={styles.controlsContent}>
                    <IconButton 
                        name={!player.muted ? "volume-high" : "volume-mute"} 
                        theme={EIconButtonTheme.Transparent}
                        size={EIconButtonSize.Large}
                        onPress={handleVolumePress} 
                    />

                    <IconButton 
                        name={!status.playing ? "play" : "pause"} 
                        theme={EIconButtonTheme.Grayscale} 
                        size={EIconButtonSize.Large}
                        onPress={handlePlayPress} 
                    />

                    <IconButton 
                        name={!status.loop ? "repeat-off" : "repeat"} 
                        theme={EIconButtonTheme.Transparent}
                        size={EIconButtonSize.Large}
                        onPress={handleLoopPress} 
                    />
                </View>
            </CenterContainer>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        gap: 32
    },
    contentContainer: {
        gap: 16
    },
    contentTextContainer: {
        gap: 2
    },
    upperControlsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 8
    },
    controlsContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 36
    },
    timeContainer: {
        gap: 8
    },
    timeContentContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    backgroundImage: {
        position: "absolute",
        inset: 0,
        opacity: 0.67
    },
    thumbnailImage: {
        width: "100%",
        aspectRatio: 1,
        borderRadius: 16,
    }
})

export default SongPlayer;