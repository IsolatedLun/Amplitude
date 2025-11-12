import { StyleSheet, View } from "react-native";
import { ETypographyTheme } from "../typography/types";
import Typography from "../typography/Typography";
import { IFilePickerAssetProps } from "./types";

const MediaInputFileDetails = (props: IFilePickerAssetProps) => {
    return(
        <View style={styles.container}>
            <Typography theme={ETypographyTheme.Muted} numberofLines={1}>Name: { props.name }</Typography>
            <Typography theme={ETypographyTheme.Muted}>Size: { props.size }Mb</Typography>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        gap: 6
    }
})

export default MediaInputFileDetails;