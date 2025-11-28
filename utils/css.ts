import { IColorSchemeValue, IGlobalStylingData } from "@/components/scheme/types";

const STYLING_DATA: IGlobalStylingData = {
    borderRadius: {
        cubeRadius: 8,
        cylinderRadius: 64
    },

    screen: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingInline: 16
    },

    fontSize: {
        default: 13,
        
        small: 9,
        medium: 16,
        large: 18,
        huge: 22,
        gigantic: 46,

        title: 28,
    },

    iconSize: {
        default: 16,
        
        small: 14,
        medium: 22,
        large: 28,
        huge: 32,
        gigantic: 44,

        page: 81,
    },

    iconButtonSize: {
        default: 16,
        
        small: 12,
        medium: 20,
        large: 26,
        huge: 32,
        gigantic: 46
    }
}

export const THEME_DARK: IColorSchemeValue = {
    deviceTheme: "dark",
    colors: {
        screenBackground: "black",
        screenText: "white",

        textTheme: "hsl(150 70% 50%)",
        textMuted: "hsl(0 0% 60%)",
        textError: "hsl(5 67% 50%)",

        horizontalLine: "hsl(0 0% 16%)"
    },
    themes: {
        buttonPrimary: { backgroundColor: "hsl(150 70% 50%)", color: null },
        inputPrimary: { backgroundColor: "hsl(0 0% 8%)", color: "hsl(0 0% 40%)" },
        cardPrimary: { backgroundColor: "hsl(0 0% 10%)", color: "hsl(0 0% 40%)" },
        sliderPrimary: { backgroundColor: "hsla(150 70% 50% / 0.6", color: "hsl(150 70% 50%)" },

        iconButtonGrayscale: { backgroundColor: "white", color: "black" }
    },

    styling: STYLING_DATA
}

export const THEME_LIGHT: IColorSchemeValue = {
    deviceTheme: "dark",
    colors: {
        screenBackground: "white",
        screenText: "black",

        textTheme: "hsl(150 70% 50%)",
        textMuted: "hsl(0 0% 60%)",
        textError: "hsl(5 67% 50%)",

        horizontalLine: "hsl(0 0% 16%)"
    },
    themes: {
        buttonPrimary: { backgroundColor: "hsl(150 70% 50%)", color: null },
        inputPrimary: { backgroundColor: "hsl(0 0% 8%)", color: "hsl(0 0% 40%)" },
        cardPrimary: { backgroundColor: "hsl(0 0% 10%)", color: "hsl(0 0% 40%)" },
        sliderPrimary: { backgroundColor: "hsla(150 70% 50% / 0.6)", color: "hsl(150 70% 50%)" },

        iconButtonGrayscale: { backgroundColor: "white", color: "black" }
    },

    styling: STYLING_DATA
}