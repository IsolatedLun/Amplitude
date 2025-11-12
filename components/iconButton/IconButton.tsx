import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import { ColorSchemeContext } from "../scheme/ColorSchemeProvider";
import { ThemeSpec } from "../scheme/types";
import { EIconButtonBorderRadiusMode, EIconButtonPaddingMode, EIconButtonSize, EIconButtonTheme, IIconButton } from "./types";

const IconButton = (props: IIconButton) => {
    const { state: { colors, themes } } = useContext(ColorSchemeContext)!;
    const paddingMode: Record<EIconButtonPaddingMode, number> = {
        [EIconButtonPaddingMode.Default]: 12
    };
    const borderRadiusMode: Record<EIconButtonBorderRadiusMode, number> = {
        [EIconButtonBorderRadiusMode.Bevel]: 8,
        [EIconButtonBorderRadiusMode.Round]: 999
    }
    const _themes: Record<EIconButtonTheme, ThemeSpec> = {
        [EIconButtonTheme.Default]: themes.buttonPrimary,
        [EIconButtonTheme.Grayscale]: themes.iconButtonGrayscale,
        [EIconButtonTheme.Transparent]: { backgroundColor: "transparent", color: colors.screenText }
    }
    const size: Record<EIconButtonSize, number> = {
        [EIconButtonSize.Default]: 26,
        [EIconButtonSize.Medium]: 32,
        [EIconButtonSize.Large]: 44
    }

    return(
        <TouchableOpacity onPress={props.onPress}>
            <View
                style={{
                    alignItems: "center",
                    borderRadius: borderRadiusMode[props.borderRadiusMode ?? EIconButtonBorderRadiusMode.Round],
                    padding: paddingMode[props.paddingMode ?? EIconButtonPaddingMode.Default],
                    backgroundColor: _themes[props.theme ?? EIconButtonTheme.Default].backgroundColor
                }}
            >
                <MaterialCommunityIcons
                    color={_themes[props.theme ?? EIconButtonTheme.Default].color ?? colors.screenText}
                    size={size[props.size ?? EIconButtonSize.Default]}
                    name={props.name}
                />
            </View>
        </TouchableOpacity>
    )
};

export default IconButton;