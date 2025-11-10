import { StyleProp, TextProps } from "react-native";

export enum ETypographyFont { Regular, Bold };
export enum ETypographyFontSize { Default, Button, Title, Huge };
export type TTypographysFontFamily = "FontRegular" | "FontBold";
export interface ITypography {
    children: React.ReactNode,
    
    fontType?: ETypographyFont,
    fontSize?: ETypographyFontSize,
    style?: StyleProp<TextProps>
}