import { IColorSchemeValue } from "@/components/scheme/type";

export const THEME_DARK: IColorSchemeValue = {
    deviceTheme: "dark",
    colors: {
        screenBackground: "black",
        screenText: "white",

        textMuted: "hsl(0 0% 60%)",
        textError: "hsl(5 67% 50%)"
    }
}

export const THEME_LIGHT: IColorSchemeValue = {
    deviceTheme: "dark",
    colors: {
        screenBackground: "white",
        screenText: "black",

        textMuted: "hsl(0 0% 60%)",
        textError: "hsl(5 67% 50%)"
    }
}