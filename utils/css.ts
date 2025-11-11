import { IColorSchemeValue } from "@/components/scheme/types";

export const THEME_DARK: IColorSchemeValue = {
    deviceTheme: "dark",
    colors: {
        screenBackground: "black",
        screenText: "white",

        textTheme: "hsl(150 70% 50%)",
        textMuted: "hsl(0 0% 60%)",
        textError: "hsl(5 67% 50%)"
    },
    themes: {
        buttonPrimary: { backgroundColor: "hsl(150 70% 50%)", color: null },
        inputPrimary: { backgroundColor: "hsl(0 0% 8%)", color: "hsl(0 0% 40%)" }
    }
}

export const THEME_LIGHT: IColorSchemeValue = {
    deviceTheme: "dark",
    colors: {
        screenBackground: "white",
        screenText: "black",

        textTheme: "hsl(150 70% 50%)",
        textMuted: "hsl(0 0% 60%)",
        textError: "hsl(5 67% 50%)"
    },
    themes: {
        buttonPrimary: { backgroundColor: "hsl(150 70% 50%)", color: null },
        inputPrimary: { backgroundColor: "hsl(0 0% 8%)", color: "hsl(0 0% 40%)" }
    }
}