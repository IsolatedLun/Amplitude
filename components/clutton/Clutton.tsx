import { useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import Icon from "../icon/Icon";
import { EIconSize } from "../icon/types";
import { ColorSchemeContext } from "../scheme/ColorSchemeProvider";
import { ThemeSpec } from "../scheme/types";
import { ETypographyFont, ETypographyFontSize } from "../typography/types";
import Typography from "../typography/Typography";
import { ECluttonBorderRadius, ECluttonPaddding, ECluttonPaddingSize, ECluttonTheme, IClutton } from "./types";

const Clutton = (props: IClutton) => {
    const { state: { colors, themes } } = useContext(ColorSchemeContext)!;
    const _themes: Record<ECluttonTheme, ThemeSpec> = {
        [ECluttonTheme.Primary]: themes.buttonPrimary
    }
    const borderRadius: Record<ECluttonBorderRadius, number> = {
        [ECluttonBorderRadius.Cube]: 8,
        [ECluttonBorderRadius.Cylidner]: 64
    }
    const paddingSize: Record<ECluttonPaddingSize, number> = {
        [ECluttonPaddingSize.Default]: 8,
    }

    return(
        <TouchableOpacity onPress={() => props.onPress ? props.onPress() : null}>
            <View style={{ 
                    backgroundColor: _themes[props.theme ?? ECluttonTheme.Primary].backgroundColor,
                    paddingBlock: paddingSize[props.paddingSize ?? ECluttonPaddingSize.Default] 
                        * (props.paddingMode && props.paddingMode === ECluttonPaddding.Rectangle ? 2 : 1),

                    paddingInline: paddingSize[props.paddingSize ?? ECluttonPaddingSize.Default] * 2,
                    borderRadius: borderRadius[props.borderRadiusMode ?? ECluttonBorderRadius.Cylidner],

                    flexDirection: props.iconOrientation ?? "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8
                }}
            >
                { props.icon ? <Icon name={props.icon} size={EIconSize.Button} /> : null }

                <Typography
                    style={{ 
                        color: _themes[props.theme ?? ECluttonTheme.Primary].color ?? colors.screenText 
                    }}
                    fontSize={ETypographyFontSize.Button} 
                    fontType={ETypographyFont.Bold}
                    center
                >
                    { props.text }
                </Typography>
            </View>
        </TouchableOpacity>
    )
};

export default Clutton;