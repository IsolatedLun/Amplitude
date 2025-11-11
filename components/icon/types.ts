import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ComponentProps } from "react";
import { StyleProp, ViewStyle } from "react-native";

export enum EIconTheme { Default, Primary, Muted };
export enum EIconSize { Default, Button, Tab, Navbar, Huge };
export interface IIcon {
    name: ComponentProps<typeof MaterialCommunityIcons>["name"],

    style?: StyleProp<ViewStyle>,
    theme?: EIconTheme,
    size?: EIconSize
}