import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from "expo-router";
import { useContext, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ColorSchemeContext } from "./scheme/ColorSchemeProvider";

SplashScreen.preventAutoHideAsync();
const RootWrapper = () => {
    const { state: { colors } } = useContext(ColorSchemeContext)!;
    const insets = useSafeAreaInsets();
    const [loaded] = useFonts({
        "FontRegular": require("../assets/fonts/UbuntuRegular.ttf"),
        "FontBold": require("../assets/fonts/UbuntuBold.ttf"),
        ...MaterialCommunityIcons.font
    });

    useEffect(() => {
        SplashScreen.hideAsync();
    }, [loaded])

    return !loaded ? null : (
        <Stack 
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
    )
};

export default RootWrapper;