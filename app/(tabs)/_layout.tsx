import { AuthUserContext } from "@/components/auth/AuthProvider";
import Icon from "@/components/icon/Icon";
import { EIcon_Size, EIcon_Theme } from "@/components/icon/types";
import Navbar from "@/components/navbar/Navbar";
import { ColorSchemeContext } from "@/components/scheme/ColorSchemeProvider";
import { IColorSchemeValue } from "@/components/scheme/types";
import { ITab } from "@/components/tab/types";
import { Tabs } from "expo-router";
import { useContext } from "react";

function constructTab(theme: IColorSchemeValue, props: ITab) {
    return(
        <Tabs.Screen name={props.name} options={{
            title: props.title,
            tabBarInactiveTintColor: theme.colors.textMuted,
            tabBarActiveTintColor: theme.colors.textTheme,
            tabBarIcon: ({ focused }) => (
                <Icon 
                    name={focused ? (props.activeIcon ?? props.icon) : props.icon}
                    theme={focused ? EIcon_Theme.Primary : EIcon_Theme.Muted}
                    size={EIcon_Size.Medium}
                />
            )
        }} />
    )
}

const MainLayout = () => {
    const { state } = useContext(ColorSchemeContext)!;
    const { user } = useContext(AuthUserContext)!;
    const tabs: ITab[] = [
        { name: "songs", title: "Songs", icon: "music-circle-outline", activeIcon: "music-circle" },
        { name: "favorites", title: "Favorites", icon: "heart-circle-outline", activeIcon: "heart-circle" },
        { name: "upload", title: "Upload", icon: "upload-circle-outline", activeIcon: "upload-circle" },
        { name: "settings", title: "Settings", icon: "cog-outline", activeIcon: "cog" }
    ]

    return(
        <>
            <Navbar />
            <Tabs screenOptions={{
                headerShown: false,
                sceneStyle: { backgroundColor: "transparent" },
                tabBarStyle: { 
                    backgroundColor: "transparent",
                    elevation: 0,
                    boxShadow: "none",
                    borderTopWidth: 0,
                },
            }}
            >
                { tabs.map(tab => constructTab(state, tab)) }
            </Tabs>
        </>
    )
};

export default MainLayout;