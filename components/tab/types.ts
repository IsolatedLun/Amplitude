import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ComponentProps } from "react";

export interface ITab {
    icon: ComponentProps<typeof MaterialCommunityIcons>["name"],
    title: string,
    name: string,
    
    activeIcon?: ComponentProps<typeof MaterialCommunityIcons>["name"],
    iconSize?: number,
}