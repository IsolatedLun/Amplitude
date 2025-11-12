export type TDeviceThemes = "light" | "dark";

export type ThemeSpec = { backgroundColor: string, color: string | null }; 
export interface IColorSchemeValue {
    deviceTheme: TDeviceThemes,
    colors: {
        screenBackground: string,
        screenText: string,

        textTheme: string,
        textMuted: string,
        textError: string,

        horizontalLine: string,
    },
    themes: {
        buttonPrimary: ThemeSpec,
        inputPrimary: ThemeSpec
    }
}

export interface IColorSchemeProvider {
    state: IColorSchemeValue,
    changeColorScheme: (deviceTheme: TDeviceThemes) => void
}