import { useContext } from "react";
import { Text } from "react-native";
import { ColorSchemeContext } from "../scheme/ColorSchemeProvider";
import { ETypographyFont, ETypographyFontSize, ETypographyTheme, ITypography, TTypographysFontFamily } from "./types";

const Typography = (props: ITypography) => {
    const { state: { colors } } = useContext(ColorSchemeContext)!;
    const fontType: Record<ETypographyFont, TTypographysFontFamily> = {
        [ETypographyFont.Regular]: "FontRegular",
        [ETypographyFont.Bold]: "FontBold"
    };
    const themes: Record<ETypographyTheme, string> = {
            [ETypographyTheme.Default]: colors.screenText,
            [ETypographyTheme.Primary]: colors.textTheme,
            [ETypographyTheme.Muted]: colors.textMuted,
            [ETypographyTheme.Error]: colors.textError
        };
    const fontSize: Record<ETypographyFontSize, number> = {
        [ETypographyFontSize.Small]: 12,
        [ETypographyFontSize.Default]: 14,
        [ETypographyFontSize.Button]: 12,
        [ETypographyFontSize.Title]: 28,
        [ETypographyFontSize.Huge]: 48
    };

    return(
        <Text 
            style={{ 
                fontFamily: fontType[props.fontType ?? ETypographyFont.Regular],
                fontSize: fontSize[props.fontSize ?? ETypographyFontSize.Default],
                color: themes[props.theme ?? ETypographyTheme.Default],
                textAlign: props.center ? "center" : "auto",
                ...props.style as any,
            }}

            numberOfLines={props.numberofLines ?? undefined}
        >
            { props.children }
        </Text>
    )
};

export default Typography;