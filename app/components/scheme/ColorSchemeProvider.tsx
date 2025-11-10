import { THEME_DARK, THEME_LIGHT } from "@/utils/css";
import { createContext, useState } from "react";
import { IColorSchemeProvider, TDeviceThemes } from "./type";

const ColorSchemeContext = createContext<IColorSchemeProvider | null>(null);

const ColorSchemeProvider = (children: React.ReactNode) => {
    const [state, setState] = useState(THEME_DARK);
    function changeColorScheme(v: TDeviceThemes) {
        setState(() => {
            switch(v) {
                case "dark": return THEME_DARK;
                case "light": return THEME_LIGHT;
                default: return THEME_DARK; 
            }
        })
    }

    return(
        <ColorSchemeContext.Provider value={{ state, changeColorScheme }}>
            { children }
        </ColorSchemeContext.Provider>
    )
};

export { ColorSchemeContext, ColorSchemeProvider };

