import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from "expo-router";
import { useContext, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AuthUserContext } from './auth/AuthProvider';
import { ColorSchemeContext } from "./scheme/ColorSchemeProvider";

SplashScreen.preventAutoHideAsync();
const RootWrapper = () => {
    const [loaded] = useFonts({
        "FontRegular": require("../assets/fonts/UbuntuRegular.ttf"),
        "FontBold": require("../assets/fonts/UbuntuBold.ttf"),
        ...MaterialCommunityIcons.font
    });

    const { state: { colors, styling } } = useContext(ColorSchemeContext)!;
    const { user } = useContext(AuthUserContext)!;
    const insets = useSafeAreaInsets();

    useEffect(() => {
        SplashScreen.hideAsync();
    }, [loaded])

    return !loaded ? null : (
        <Stack 
            screenOptions={{
                headerShown: false,
                contentStyle: {
                    backgroundColor: colors.screenBackground,
                    paddingBlockStart: insets.top + styling.screen.paddingTop,
                    paddingBlockEnd: insets.bottom + styling.screen.paddingBottom,
                    paddingInline: (insets.left + insets.right) + styling.screen.paddingInline
                }
            }}
            initialRouteName='index'
        >
            <Stack.Screen name="index" />

            <Stack.Protected guard={user === null}>
                <Stack.Screen name="auth/login" />
            </Stack.Protected>
            <Stack.Protected guard={user !== null}>
                <Stack.Screen name="(tabs)" />
            </Stack.Protected>
        </Stack>
    )
};

export default RootWrapper;