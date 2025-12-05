import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ComponentProps } from "react";
import { StyleProp, ViewStyle } from "react-native";

export enum ECluttonTheme { Primary, Danger };
export enum ECluttonBorderRadius { Cube, Cylidner };
export enum ECluttonPaddding { Square, Rectangle };
export enum ECluttonPaddingSize { Default };
export interface IClutton {
    text: string,

    onPress?: () => void,
    theme?: ECluttonTheme,
    style?: StyleProp<ViewStyle>,
    paddingMode?: ECluttonPaddding,
    paddingSize?: ECluttonPaddingSize,
    borderRadiusMode?: ECluttonBorderRadius,
    iconOrientation?: "row" | "row-reverse",
    disabled?: boolean,
    loading?: boolean,
    icon?: ComponentProps<typeof MaterialCommunityIcons>["name"],
}