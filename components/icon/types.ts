import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ComponentProps } from "react";
import { ETypographyTheme } from "../Typography/types";

export enum EIconTheme { Default, Primary, Muted };
export enum EIconSize { Default, Button, Huge };
export interface IIcon {
    name: ComponentProps<typeof MaterialCommunityIcons>["name"],

    theme?: ETypographyTheme,
    size?: EIconSize
}