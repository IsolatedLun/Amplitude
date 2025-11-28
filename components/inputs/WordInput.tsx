import { capitalizeSentence } from "@/utils/funcs";
import { useContext, useEffect, useState } from "react";
import { TextInput, View } from "react-native";
import { ColorSchemeContext } from "../scheme/ColorSchemeProvider";
import { ThemeSpec } from "../scheme/types";
import { ETypography_FontSize, ETypography_Theme } from "../typography/types";
import Typography from "../typography/Typography";
import { EWordInputBorderRadius, EWordInputBorderThickness, EWordInputTheme, IWordInput } from "./types";

const WordInput = (props: IWordInput) => {
    const { state: { colors, themes, styling } } = useContext(ColorSchemeContext)!;
    const [isFocused, setIsFocused] = useState(false);
    const [themeState, setThemeState] = useState(colors.textTheme);
    
    const _themes: Record<EWordInputTheme, ThemeSpec> = {
        [EWordInputTheme.Primary]: themes.inputPrimary
    }
    const _borderRadius: Record<EWordInputBorderRadius, number> = {
        [EWordInputBorderRadius.Cube]: styling.borderRadius.cubeRadius,
    }
    const _borderThickness: Record<EWordInputBorderThickness, number> = {
        [EWordInputBorderThickness.Default]: 2,
        [EWordInputBorderThickness.Thin]: 1
    }

    useEffect(() => {
        setThemeState(() => {
            if(props.error)
                return colors.textError;
            return isFocused ? colors.textTheme : _themes[props.theme ?? EWordInputTheme.Primary].color!
        })
    }, [isFocused, props.error])

    return(
        <View style={styles.container}>
            { 
            props.title ? 
                <Typography 
                    theme={
                        props.error 
                        ? ETypography_Theme.Error 
                        : isFocused 
                            ? ETypography_Theme.Primary 
                            : ETypography_Theme.Muted
                    }
                >
                    { props.title }
                </Typography> 
                : null
            }
            <TextInput
                style={{
                    color: colors.screenText,
                    backgroundColor: _themes[props.theme ?? EWordInputTheme.Primary].backgroundColor,
                    borderColor: themeState,
                    paddingInlineStart: 16,
                    borderRadius: _borderRadius[props.borderRadiusMode ?? EWordInputBorderRadius.Cube],
                    borderWidth: _borderThickness[props.borderThicknessMode ?? EWordInputBorderThickness.Default]
                }}

                value={props.value}
                placeholder={props.placeholder}
                placeholderTextColor={themeState}
                onChangeText={(v) => props.onInput ? props.onInput(v) : null}

                onFocus={() => setIsFocused(true)}
                onBlur={(e) => {
                    props.onBlur ? props.onBlur(e) : null;
                    setIsFocused(false);
                }}
            />
            { 
            props.error ? 
                <Typography 
                    theme={ETypography_Theme.Error} 
                    fontSize={ETypography_FontSize.Small}
                    style={{ marginInlineStart: 8 }}>
                        { capitalizeSentence(props.error) }
                </Typography> 
                : null 
            }
        </View>
    )
};

const styles = {
    container: {
        gap: 8
    }
}

export default WordInput;