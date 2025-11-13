import { AuthUserContext } from "@/components/auth/AuthProvider";
import Clutton from "@/components/clutton/Clutton";
import { ECluttonTheme } from "@/components/clutton/types";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { StyleSheet, View } from "react-native";

const SettingsTab = () => {
    const router = useRouter();
    const { user, logout } = useContext(AuthUserContext)!;

    function handleLogoutPress() {
        logout();
        router.replace("/");
    }

    return(
        <View style={styles.container}>
            <Clutton text="Logout" icon="logout" onPress={handleLogoutPress} />
            <Clutton text="Reset App Data" icon="trash-can" theme={ECluttonTheme.Danger} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        gap: 16
    }
})

export default SettingsTab;