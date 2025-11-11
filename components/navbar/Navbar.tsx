import { StyleSheet, View } from "react-native";
import Icon from "../icon/Icon";
import { EIconSize, EIconTheme } from "../icon/types";
import Typography from "../typography/Typography";
import { ETypographyFontSize } from "../typography/types";

const Navbar = () => {
    return(
        <View style={styles.container}>
            <Icon name="music-circle" size={EIconSize.Navbar} theme={EIconTheme.Primary} />
            <Typography fontSize={ETypographyFontSize.Title}>Ampl</Typography>
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