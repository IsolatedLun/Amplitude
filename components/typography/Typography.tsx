import { useContext } from "react";
import { Text } from "react-native";
import { ColorSchemeContext } from "../scheme/ColorSchemeProvider";
import {
    ETypography_FontSize,
    ETypography_FontType,
    ETypography_Theme,
    ITypography,
    TTypography_FontFamily
} from "./types";

const Typography = (props: ITypography) => {
    const { state: { colors, styling } } = useContext(ColorSchemeContext)!;
    const _fontType: Record<ETypography_FontType, TTypography_FontFamily> = {
        [ETypography_FontType.Regular]: "FontRegular",
        [ETypography_FontType.Bold]: "FontBold"
    };
    const _themes: Record<ETypography_Theme, string> = {
        [ETypography_Theme.Default]: colors.screenText,
        
        [ETypography_Theme.Primary]: colors.textTheme,
        [ETypography_Theme.Muted]: colors.textMuted,
        [ETypography_Theme.Error]: colors.textError
    };
    const _fontSize: Record<ETypography_FontSize, number> = {
        [ETypography_FontSize.Default]: styling.fontSize.default,

        [ETypography_FontSize.Small]: styling.fontSize.small,
        [ETypography_FontSize.Medium]: styling.fontSize.medium,
        [ETypography_FontSize.Large]: styling.fontSize.large,
        [ETypography_FontSize.Huge]: styling.fontSize.huge,
        [ETypography_FontSize.Gigantic]: styling.fontSize.gigantic,
        
        [ETypography_FontSize.Title]: styling.fontSize.title,
    };

    return(
        <Text 
            { ...props.textProps }
            style={{ 
                fontFamily: _fontType[props.fontType ?? ETypography_FontType.Regular],
                fontSize: _fontSize[props.fontSize ?? ETypography_FontSize.Default],
                color: _themes[props.theme ?? ETypography_Theme.Default],
                textAlign: props.center ? "center" : "auto",
                ...props.style as object,
            }}
        >
            { props.children }
        </Text>
    )
};

export default Typography;