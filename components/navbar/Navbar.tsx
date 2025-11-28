import { StyleSheet, View } from "react-native";
import Icon from "../icon/Icon";
import { EIcon_Size, EIcon_Theme } from "../icon/types";
import Typography from "../typography/Typography";
import { ETypography_FontSize } from "../typography/types";

const Navbar = () => {
    return(
        <View style={styles.container}>
            <Icon name="music-circle" size={EIcon_Size.Huge} theme={EIcon_Theme.Primary} />
            <Typography fontSize={ETypography_FontSize.Title}>Ampl</Typography>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginBlockEnd: 18,
        gap: 10
    }
});

export default Navbar;