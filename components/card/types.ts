import { StyleProp, ViewStyle } from "react-native";

export enum ECardBorderRadiusMode { Bevel };
export enum ECardBorderThicknessMode { Default, Thin };
export enum ECardPaddingMode { Default };
export enum ECardTheme { Default };
export interface ICard {
    children: React.ReactNode,

    theme?: ECardTheme,
    paddingMode?: ECardPaddingMode,
    borderThicknessMode?: ECardBorderThicknessMode,
    borderRadiusMode?: ECardBorderRadiusMode,
    style?: StyleProp<ViewStyle>
}