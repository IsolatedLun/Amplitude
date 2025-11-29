import { ISong } from '@/server/src/routes/types';
import { formatToMinutes } from '@/utils/funcs';
import Slider from '@react-native-community/slider';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { useRouter } from 'expo-router';
import { useContext } from 'react';
import { Image, StyleSheet, View } from "react-native";
import CenterContainer from "../containers/CenterContainer";
import IconButton from '../iconButton/IconButton';
import { EIconButton_Size, EIconButton_Theme } from '../iconButton/types';
import { ColorSchemeContext } from '../scheme/ColorSchemeProvider';
import Typography from "../typography/Typography";
import { ETypography_FontSize, ETypography_Theme } from '../typography/types';

const SongPlayer = (props: ISong) => {
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
                        theme={EIconButton_Theme.Transparent}
                        size={EIconButton_Size.Large}
                        onPress={handleGoBack}
                    />
                    <IconButton 
                        name="dots-vertical"
                        theme={EIconButton_Theme.Transparent}
                        size={EIconButton_Size.Large}
                        onPress={() => null}
                    />
                </View>
                <View style={styles.contentContainer}>
                    <Image source={{ uri: props.image }} style={styles.thumbnailImage} />
                    <View style={styles.contentTextContainer}>
                        <Typography 
                            fontSize={ETypography_FontSize.Title}
                            textProps={{ numberOfLines: 2 }}
                        >
                                { props.title }
                        </Typography>
                        <Typography theme={ETypography_Theme.Muted}>{ props.author }</Typography>
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
                        theme={EIconButton_Theme.Transparent}
                        size={EIconButton_Size.Large}
                        onPress={handleVolumePress} 
                    />

                    <IconButton 
                        name={!status.playing ? "play" : "pause"} 
                        theme={EIconButton_Theme.Grayscale} 
                        size={EIconButton_Size.Gigantic}
                        onPress={handlePlayPress} 
                    />

                    <IconButton 
                        name={!status.loop ? "repeat-off" : "repeat"} 
                        theme={EIconButton_Theme.Transparent}
                        size={EIconButton_Size.Large}
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