import { useRouter } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "../icon/Icon";
import { EIconSize } from "../icon/types";
import HorizontalLine from "../misc/horizontalLine/HorizontalLine";
import { ETypographyTheme } from "../typography/types";
import Typography from "../typography/Typography";
import { ISongCard } from "./types";

const SongCard = (props: ISongCard) => {
    const router = useRouter();

    function routeToSong() {
        router.replace(`/player/${props.id}`);
    }

    return(
        <>
            <View style={styles.container}>
                <TouchableOpacity style={styles.detailContainer} onPress={routeToSong}>
                    <Image source={{ uri: props.image }} style={styles.image} />
                    <View style={styles.textContainer}>
                        <Typography numberofLines={1}>{ props.title }</Typography>
                        <Typography theme={ETypographyTheme.Muted}>{ props.author }</Typography>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon name="dots-horizontal" size={EIconSize.Tab} />
                </TouchableOpacity>
            </View>
            <HorizontalLine />
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12
    },
    textContainer: {
        gap: 8
    },
    detailContainer: {
        flexDirection: "row",
        flex: 1,
        gap: 10,
    },
    image: {
        width: 65,
        height: 65,
        borderRadius: 12
    }
})

export default SongCard;