import { ISongPreview } from "@/api/types";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Clutton from "../clutton/Clutton";
import { ECluttonBorderRadius, ECluttonTheme } from "../clutton/types";
import Icon from "../icon/Icon";
import { EIconSize } from "../icon/types";
import HorizontalLine from "../misc/horizontalLine/HorizontalLine";
import MModal from "../modal/MModal";
import { ETypographyFontSize, ETypographyTheme } from "../typography/types";
import Typography from "../typography/Typography";

const SongCard = (props: ISongPreview) => {
    const router = useRouter();
    const [openModal, setOpenModal] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);


    function routeToSong() {
        router.replace(`/player/${props._id}`);
    }

    function closeModal() {
        setOpenModal(false);
    }

    function handleDeletePress() {
        setOpenModal(false);
    }

    function handleEditPress() {
        setOpenModal(false);
        router.replace(`/(tabs)/upload?editID=${props._id}`);
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

                <TouchableOpacity onPress={() => setOpenModal(true)}>
                    <Icon name="dots-horizontal" size={EIconSize.Tab} />
                </TouchableOpacity>
            </View>
            <HorizontalLine />

            <MModal open={openModal} closeFn={closeModal}>
                <View style={styles.modalOptionsContainer}>
                    <Typography 
                        numberofLines={1} 
                        fontSize={ETypographyFontSize.Title}
                    >
                        { props.title }
                    </Typography>

                    <Clutton 
                        text={isFavorite ? "Remove from favorites" : "Add to favorites"} 
                        icon="heart" 
                        borderRadiusMode={ECluttonBorderRadius.Cube}
                    />
                    <Clutton 
                        text="Edit song" 
                        icon="pencil"
                        borderRadiusMode={ECluttonBorderRadius.Cube}
                        onPress={handleEditPress} 
                    />
                    <Clutton 
                        text="Delete song" 
                        theme={ECluttonTheme.Danger} 
                        icon="trash-can"
                        borderRadiusMode={ECluttonBorderRadius.Cube} 
                        onPress={handleDeletePress}
                    />
                </View>
            </MModal>
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
    modalOptionsContainer: {
        gap: 16
    },
    image: {
        width: 65,
        height: 65,
        borderRadius: 12
    }
})

export default SongCard;