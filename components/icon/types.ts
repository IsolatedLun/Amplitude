import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ComponentProps } from "react";
import { StyleProp, ViewStyle } from "react-native";

export enum EIcon_Theme { Default, Primary, Muted };
export enum EIcon_Size { 
    Default,
    
    Small,
    Medium,
    Large,
    Huge,
    Gigantic,

    Page
};
export interface IIcon {
    name: ComponentProps<typeof MaterialCommunityIcons>["name"],

    style?: StyleProp<ViewStyle>,
    theme?: EIcon_Theme,
    size?: EIcon_Size
}