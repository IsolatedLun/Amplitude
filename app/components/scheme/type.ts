export type TDeviceThemes = "light" | "dark";

export interface IColorSchemeValue {
    deviceTheme: TDeviceThemes,
    colors: {
        screenBackground: string,
        screenText: string,

        textMuted: string,
        textError: string
    }
}

export interface IColorSchemeProvider {
    state: IColorSchemeValue,
    changeColorScheme: (deviceTheme: TDeviceThemes) => void
}