import { useContext } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import Icon from "../icon/Icon";
import { EIcon_Size } from "../icon/types";
import { ColorSchemeContext } from "../scheme/ColorSchemeProvider";
import { ThemeSpec } from "../scheme/types";
import { ETypography_FontSize, ETypography_FontType } from "../typography/types";
import Typography from "../typography/Typography";
import { ECluttonBorderRadius, ECluttonPaddding, ECluttonPaddingSize, ECluttonTheme, IClutton } from "./types";

const Clutton = (props: IClutton) => {
    const { state: { colors, themes, styling } } = useContext(ColorSchemeContext)!;
    const _themes: Record<ECluttonTheme, ThemeSpec> = {
        [ECluttonTheme.Primary]: themes.buttonPrimary,
        [ECluttonTheme.Danger]: { backgroundColor: colors.textError, color: null }
    };
    const borderRadius: Record<ECluttonBorderRadius, number> = {
        [ECluttonBorderRadius.Cube]: styling.borderRadius.cubeRadius,
        [ECluttonBorderRadius.Cylidner]: styling.borderRadius.cylinderRadius
    };
    const paddingSize: Record<ECluttonPaddingSize, number> = {
        [ECluttonPaddingSize.Default]: 8,
    };

    return(
        <TouchableOpacity 
            activeOpacity={props.loading ? 1 : .5} 
            onPress={() => props.onPress && !props.loading ? props.onPress() : null}
        >
            <View style={{ 
                    position: "relative",
                    backgroundColor: _themes[props.theme ?? ECluttonTheme.Primary].backgroundColor,
                    paddingBlock: paddingSize[props.paddingSize ?? ECluttonPaddingSize.Default] 
                        * (props.paddingMode && props.paddingMode === ECluttonPaddding.Rectangle ? 2 : 1),

                    paddingInline: paddingSize[props.paddingSize ?? ECluttonPaddingSize.Default] * 2,
                    borderRadius: borderRadius[props.borderRadiusMode ?? ECluttonBorderRadius.Cube],

                    flexDirection: props.iconOrientation ?? "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    opacity: props.loading ? .33 : null,

                    ...props.style as any,
                }}
            >
                { props.icon ? <Icon name={props.icon} size={EIcon_Size.Medium} /> : null }

                <Typography
                    style={{ 
                        color: _themes[props.theme ?? ECluttonTheme.Primary].color ?? colors.screenText,
                    }}
                    fontSize={ETypography_FontSize.Default} 
                    fontType={ETypography_FontType.Bold}
                    center
                >
                    { props.text }
                </Typography>

            </View>
                {
                    props.loading
                    ? <ActivityIndicator 
                            style={{ position: "absolute", inset: 0 }} 
                            color={_themes[props.theme ?? ECluttonTheme.Primary].backgroundColor}
                        />
                    : null
                }
        </TouchableOpacity>
    )
};

export default Clutton;