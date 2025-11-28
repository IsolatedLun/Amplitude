import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import { ColorSchemeContext } from "../scheme/ColorSchemeProvider";
import { ThemeSpec } from "../scheme/types";
import {
    EIconButton_BorderRadiusMode,
    EIconButton_PaddingMode,
    EIconButton_Size,
    EIconButton_Theme,
    IIconButton
} from "./types";

const IconButton = (props: IIconButton) => {
    const { state: { colors, themes, styling } } = useContext(ColorSchemeContext)!;
    const paddingMode: Record<EIconButton_PaddingMode, number> = {
        [EIconButton_PaddingMode.Default]: 12
    };
    const borderRadiusMode: Record<EIconButton_BorderRadiusMode, number> = {
        [EIconButton_BorderRadiusMode.Bevel]: styling.borderRadius.cubeRadius,
        [EIconButton_BorderRadiusMode.Round]: 999
    }
    const _themes: Record<EIconButton_Theme, ThemeSpec> = {
        [EIconButton_Theme.Default]: themes.buttonPrimary,
        [EIconButton_Theme.Grayscale]: themes.iconButtonGrayscale,
        [EIconButton_Theme.Transparent]: { backgroundColor: "transparent", color: colors.screenText }
    }
    const size: Record<EIconButton_Size, number> = {
        [EIconButton_Size.Default]: styling.iconButtonSize.default,
        
        [EIconButton_Size.Small]: styling.iconButtonSize.small,
        [EIconButton_Size.Medium]: styling.iconButtonSize.medium,
        [EIconButton_Size.Large]: styling.iconButtonSize.large,
        [EIconButton_Size.Huge]: styling.iconButtonSize.huge,
        [EIconButton_Size.Gigantic]: styling.iconButtonSize.gigantic
    }

    return(
        <TouchableOpacity onPress={props.onPress}>
            <View
                style={{
                    alignItems: "center",
                    borderRadius: borderRadiusMode[props.borderRadiusMode ?? EIconButton_BorderRadiusMode.Round],
                    padding: paddingMode[props.paddingMode ?? EIconButton_PaddingMode.Default],
                    backgroundColor: _themes[props.theme ?? EIconButton_Theme.Default].backgroundColor
                }}
            >
                <MaterialCommunityIcons
                    color={_themes[props.theme ?? EIconButton_Theme.Default].color ?? colors.screenText}
                    size={size[props.size ?? EIconButton_Size.Default]}
                    name={props.name}
                />
            </View>
        </TouchableOpacity>
    )
};

export default IconButton;