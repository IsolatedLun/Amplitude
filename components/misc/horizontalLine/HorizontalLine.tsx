import { ColorSchemeContext } from "@/components/scheme/ColorSchemeProvider";
import { useContext } from "react";
import { View } from "react-native";
import { IHorizontalLine } from "./types";

const HorizontalLine = (props: IHorizontalLine) => {
    const { state: { colors } } = useContext(ColorSchemeContext)!;
    
    return <View 
        style={{ 
            width: "100%", 
            height: 1, 
            backgroundColor: colors.horizontalLine, 
            marginBlockStart: props.spacing ?? 12
        }} 
    />
};

export default HorizontalLine;