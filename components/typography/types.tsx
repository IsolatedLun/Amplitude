import { StyleProp, TextProps, TextStyle } from "react-native";

export enum ETypography_Theme { 
    Default, 
    Primary, 
    Error, 
    Muted 
};
export enum ETypography_FontType { 
    Regular, 
    Bold 
};
export enum ETypography_FontSize { 
    Default, 
    
    Small, 
    Medium, 
    Large, 
    Huge,
    Gigantic, 

    Title
};

export type TTypography_FontFamily = "FontRegular" | "FontBold";
export interface ITypography {
    children: React.ReactNode,
    
    fontSize?: ETypography_FontSize,
    fontType?: ETypography_FontType,
    theme?: ETypography_Theme,
    center?: boolean,
    
    textProps?: TextProps,
    style?: StyleProp<TextStyle>
}