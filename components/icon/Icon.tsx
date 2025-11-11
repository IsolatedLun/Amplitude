import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useContext } from "react";
import { ColorSchemeContext } from "../scheme/ColorSchemeProvider";
import { EIconSize, EIconTheme, IIcon } from "./types";

const Icon = (props: IIcon) => {
    const { state: { colors } } = useContext(ColorSchemeContext)!;
    const themes: Record<EIconTheme, string> = {
        [EIconTheme.Default]: colors.screenText,
        [EIconTheme.Primary]: colors.textTheme,
        [EIconTheme.Muted]: colors.textMuted
    };
    const sizes: Record<EIconSize, number> = {
        [EIconSize.Default]: 16,
        [EIconSize.Button]: 18,
        [EIconSize.Tab]: 24,
        [EIconSize.Navbar]: 32,
        [EIconSize.Huge]: 81
    };

    return(
        <MaterialCommunityIcons 
            style={{ ...props.style as any }}
            name={props.name}
            color={themes[props.theme ?? EIconTheme.Default]}
            size={sizes[props.size ?? EIconSize.Default]}
        />
    )
};

export default Icon;