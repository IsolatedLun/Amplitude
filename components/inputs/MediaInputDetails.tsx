import { StyleSheet, View } from "react-native";
import { ETypography_Theme } from "../typography/types";
import Typography from "../typography/Typography";
import { IFilePickerAssetProps } from "./types";

const MediaInputFileDetails = (props: IFilePickerAssetProps) => {
    return(
        <View style={styles.container}>
            <Typography 
                textProps={{ numberOfLines: 2 }}
                theme={ETypography_Theme.Muted}
            >
                Name: { props.name }
            </Typography>
            <Typography 
                theme={ETypography_Theme.Muted}
            >
                    Size: { props.size }Mb
            </Typography>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        gap: 6
    }
})

export default MediaInputFileDetails;