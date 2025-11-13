import { AuthUserContext } from "@/components/auth/AuthProvider";
import { IAuthUser } from "@/components/auth/types";
import Card from "@/components/card/Card";
import Clutton from "@/components/clutton/Clutton";
import { ECluttonBorderRadius, ECluttonTheme } from "@/components/clutton/types";
import WordInput from "@/components/inputs/WordInput";
import { ETypographyFontSize } from "@/components/typography/types";
import Typography from "@/components/typography/Typography";
import { USER_VALIDATION_SCHEMA } from "@/utils/global";
import { local_ClearSongs, local_editMockUser } from "@/utils/local";
import { useRouter } from "expo-router";
import { Formik } from "formik";
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
        local_ClearSongs();
    }

    function handleUserEditSubmit(v: IAuthUser) {
        local_editMockUser(v);
    }

    return(
        <View style={styles.container}>
            <Card style={styles.formContainer}>
                <Typography fontSize={ETypographyFontSize.Title}>Edit user info</Typography>

                <Formik 
                    validationSchema={USER_VALIDATION_SCHEMA}
                    initialValues={{ username: user!.username, password: user!.password }}
                    onSubmit={handleUserEditSubmit}
                >
                    {
                        ({ handleChange, handleBlur, submitForm, resetForm, values, errors }) => (
                            <View style={styles.innerFormContainer}>
                                <WordInput 
                                    title="Username"
                                    placeholder="Enter username"
                                    value={values.username}
                                    error={errors.username}

                                    onInput={handleChange("username")}
                                    onBlur={handleBlur("username")}
                                />
                                <WordInput 
                                    title="Password"
                                    placeholder="Enter password"
                                    value={values.password}
                                    error={errors.password}

                                    onInput={handleChange("password")}
                                    onBlur={handleBlur("password")}
                                />

                                <Clutton 
                                    onPress={submitForm}
                                    text="Save Changes" 
                                    icon="update" 
                                    borderRadiusMode={ECluttonBorderRadius.Cube} 
                                />
                            </View>
                        )
                    }
                </Formik>
            </Card>


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
    formContainer: {
        gap: 16
    },
    innerFormContainer: {
        gap: 24
    },
    buttonContainer: {
        gap: 16
    }
})

export default SettingsTab;