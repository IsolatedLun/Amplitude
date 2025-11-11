import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ComponentProps } from "react";

export interface ITab {
    name: string,
    title: string,
    icon: ComponentProps<typeof MaterialCommunityIcons>["name"],
    activeIcon?: ComponentProps<typeof MaterialCommunityIcons>["name"],
    iconSize?: number,
}