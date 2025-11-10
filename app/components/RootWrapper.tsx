import { Stack } from "expo-router";
import { useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ColorSchemeContext } from "./scheme/ColorSchemeProvider";

const RootWrapper = () => {
    const { state: { colors } } = useContext(ColorSchemeContext)!;
    const insets = useSafeAreaInsets();

    return <Stack 
        screenOptions={{
            headerShown: false,
            contentStyle: {
                backgroundColor: colors.screenBackground,
                paddingBlockStart: insets.top + 8,
                paddingBlockEnd: insets.bottom + 8,
                paddingInline: (insets.left + insets.right) + 16
            }
        }}
    />
};

export default RootWrapper;