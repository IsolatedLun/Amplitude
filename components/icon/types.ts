import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ComponentProps } from "react";

export enum EIconTheme { Default, Primary, Muted };
export enum EIconSize { Default, Button, Tab, Navbar, Huge };
export interface IIcon {
    name: ComponentProps<typeof MaterialCommunityIcons>["name"],

    theme?: EIconTheme,
    size?: EIconSize
}