export interface ISizeOptions {
    default: number,
    small: number,
    medium: number,
    large: number,
    huge: number,
    gigantic: number,
}

export enum ESizeOptions {
    Default,
    
    Small,
    Medium,
    Large,
    Huge,
    Gigantic
}


export interface IGlobalStylingData {    
    borderRadius: {
        cubeRadius: number,
        cylinderRadius: number,
    },

    screen: {
        paddingTop: number,
        paddingBottom: number,
        paddingInline: number
    },

    fontSize: {
        title: number
    } & ISizeOptions,

    iconSize: {
        page: number
    } & ISizeOptions,

    iconButtonSize: {
    } & ISizeOptions,
}

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
        inputPrimary: ThemeSpec,
        cardPrimary: ThemeSpec,
        sliderPrimary: ThemeSpec,

        iconButtonGrayscale: ThemeSpec
    },

    styling: IGlobalStylingData
}


export interface IColorSchemeProvider {
    state: IColorSchemeValue,
    changeColorScheme: (deviceTheme: TDeviceThemes) => void
}