import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ComponentProps } from "react";

export enum ECluttonTheme { Primary };
export enum ECluttonBorderRadius { Cube, Cylidner };
export enum ECluttonPaddding { Square, Rectangle };
export enum ECluttonPaddingSize { Default };
export interface IClutton {
    text: string,

    onPress?: () => void,
    theme?: ECluttonTheme,
    paddingMode?: ECluttonPaddding,
    paddingSize?: ECluttonPaddingSize,
    borderRadiusMode?: ECluttonBorderRadius,
    iconOrientation?: "row" | "row-reverse";
    icon?: ComponentProps<typeof MaterialCommunityIcons>["name"],
}