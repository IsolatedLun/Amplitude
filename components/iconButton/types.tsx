import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ComponentProps } from "react";

export enum EIconButtonBorderRadiusMode { Bevel, Round };
export enum EIconButtonPaddingMode { Default };
export enum EIconButtonTheme { Default, Grayscale, Transparent };
export enum EIconButtonSize { Default, Medium, Large };

export interface IIconButton {
    name: ComponentProps<typeof MaterialCommunityIcons>["name"],
    onPress: () => void,

    borderRadiusMode?: EIconButtonBorderRadiusMode,
    paddingMode?: EIconButtonPaddingMode,
    theme?: EIconButtonTheme,
    size?: EIconButtonSize
}