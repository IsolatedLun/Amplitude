import { useContext } from "react";
import { Text } from "react-native";
import { ColorSchemeContext } from "../scheme/ColorSchemeProvider";
import { ETypographyFont, ETypographyFontSize, ITypography, TTypographysFontFamily } from "./types";

const Typography = (props: ITypography) => {
    const { state: { colors } } = useContext(ColorSchemeContext)!;
    const fontType: Record<ETypographyFont, TTypographysFontFamily> = {
        [ETypographyFont.Regular]: "FontRegular",
        [ETypographyFont.Bold]: "FontBold"
    };
    const fontSize: Record<ETypographyFontSize, number> = {
        [ETypographyFontSize.Default]: 12,
        [ETypographyFontSize.Button]: 14,
        [ETypographyFontSize.Title]: 28,
        [ETypographyFontSize.Huge]: 48
    };

    return(
        <Text 
            style={{ 
                fontFamily: fontType[props.fontType ?? ETypographyFont.Regular],
                fontSize: fontSize[props.fontSize ?? ETypographyFontSize.Default],
                color: colors.screenText 
            }}
        >
            { props.children }
        </Text>
    )
};

export default Typography;