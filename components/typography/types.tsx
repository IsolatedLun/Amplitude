import { StyleProp, TextStyle } from "react-native";

export enum ETypographyTheme { Default, Primary, Error, Muted };

export enum ETypographyFont { Regular, Bold };
export enum ETypographyFontSize { Small, Default, Button, Title, Huge };
export type TTypographysFontFamily = "FontRegular" | "FontBold";
export interface ITypography {
    children: React.ReactNode,
    
    center?: boolean,
    theme?: ETypographyTheme,
    fontType?: ETypographyFont,
    fontSize?: ETypographyFontSize,
    style?: StyleProp<TextStyle>
}