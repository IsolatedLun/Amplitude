import { bytesToMB } from "@/utils/funcs";
import { StyleSheet, View } from "react-native";
import Card from "../card/Card";
import Icon from "../icon/Icon";
import { EIcon_Size, EIcon_Theme } from "../icon/types";
import { ETypography_Theme } from "../typography/types";
import Typography from "../typography/Typography";
import { IFileInfoCard } from "./types";

const FileInfoCard = (props: IFileInfoCard) => {
    return(
        <Card style={styles.uploadContainer}>
            <View style={styles.uploadPlaceholderContainer}>
                <Icon 
                    name={props.icon} 
                    size={EIcon_Size.Medium} 
                    theme={EIcon_Theme.Muted} 
                />
                <Typography theme={ETypography_Theme.Muted}>
                    { props.title }
                </Typography>
            </View>

            {
                props.fileInfo
                ? (
                    <View style={styles.fileInfoContainer}>
                        <View style={{ flex: 1 }}>
                            <Typography theme={ETypography_Theme.Muted}>
                                Name: { props.fileInfo.uri!.split("/").pop()?.replaceAll("-", " ") }
                            </Typography>
                        </View>
                        <Typography theme={ETypography_Theme.Muted}>
                            Size: { bytesToMB(props.fileInfo.size!) }Mb
                        </Typography>
                    </View>
                )
                : null
            }
        </Card>
    )
};

const styles = StyleSheet.create({
    container: {
        gap: 8
    },
    uploadContainer: {
        gap: 10
    },
    uploadPlaceholderContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    fileInfoContainer: {
        gap: 8
    }
})

export default FileInfoCard;