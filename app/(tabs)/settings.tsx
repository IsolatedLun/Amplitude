import { IndexAPI_Reset } from "@/api/indexApi";
import { AuthUserContext } from "@/components/auth/AuthProvider";
import Clutton from "@/components/clutton/Clutton";
import { ECluttonTheme } from "@/components/clutton/types";
import EditUserInfo from "@/page_components/settings/EditUserInfo";
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

    function handleResetAppData() {
        IndexAPI_Reset()
            .then(() => logout());
    }

    return(
        <View style={styles.container}>
            <EditUserInfo />

            <View style={styles.buttonContainer}>
                <Clutton text="Log out" icon="logout" onPress={handleLogoutPress} />
                <Clutton
                    onPress={handleResetAppData}
                    text="Reset app data" 
                    icon="trash-can" 
                    theme={ECluttonTheme.Danger} 
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        gap: 38
    },
    buttonContainer: {
        gap: 16
    }
})

export default SettingsTab;