import { useContext } from "react";
import { View } from "react-native";
import { ColorSchemeContext } from "../scheme/ColorSchemeProvider";
import { ThemeSpec } from "../scheme/types";
import { ECardBorderRadiusMode, ECardBorderThicknessMode, ECardPaddingMode, ECardTheme, ICard } from "./types";

const Card = (props: ICard) => {
    const { state: { themes } } = useContext(ColorSchemeContext)!;
    const borderThicknessMode: Record<ECardBorderThicknessMode, number> = {
        [ECardBorderThicknessMode.Default]: 2,
        [ECardBorderThicknessMode.Thin]: 1
    };
    const paddingMode: Record<ECardPaddingMode, number> = {
        [ECardPaddingMode.Default]: 12
    }
    const borderRadiusMode: Record<ECardBorderRadiusMode, number> = {
        [ECardBorderRadiusMode.Bevel]: 8
    }
    const theme: Record<ECardTheme, ThemeSpec> = {
        [ECardTheme.Default]: themes.inputPrimary
    }

    return(
        <View
            style={{
                backgroundColor: theme[props.theme ?? ECardTheme.Default].backgroundColor,
                borderColor: theme[props.theme ?? ECardTheme.Default].color!,
                borderWidth: borderThicknessMode[props.borderThicknessMode ?? ECardBorderThicknessMode.Default],
                borderRadius: borderRadiusMode[props.borderRadiusMode ?? ECardBorderRadiusMode.Bevel],
                padding: paddingMode[props.paddingMode ?? ECardPaddingMode.Default],

                ...props.style as any
            }}
        >
            { props.children }
        </View>
    )
};

export default Card;