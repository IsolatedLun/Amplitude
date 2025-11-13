import { AuthUserContext } from "@/components/auth/AuthProvider";
import { IAuthUser } from "@/components/auth/types";
import Clutton from "@/components/clutton/Clutton";
import CenterContainer from "@/components/containers/CenterContainer";
import Icon from "@/components/icon/Icon";
import { EIconSize, EIconTheme } from "@/components/icon/types";
import WordInput from "@/components/inputs/WordInput";
import { ETypographyFontSize, ETypographyTheme } from "@/components/typography/types";
import Typography from "@/components/typography/Typography";
import { USER_VALIDATION_SCHEMA } from "@/utils/global";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";

const LoginPage = () => {
    const router = useRouter();
    const { user, login } = useContext(AuthUserContext)!;
    const [loginError, setLoginError] = useState<string | null>(null);

    function handleSubmit(v: IAuthUser) {
        login(v)
            .then(() => router.push("/(tabs)/songs"))
            .catch(setLoginError)
    }
    
    return(
        <Formik 
            validationSchema={USER_VALIDATION_SCHEMA}
            initialValues={{ username: "", password: "" }}
            onSubmit={handleSubmit}
        >
            {
                ({ handleChange, handleBlur, submitForm, values, errors }) => (
                    <CenterContainer style={styles.container}>
                        <View style={styles.titleContainer}>
                            <Icon name="login" theme={EIconTheme.Primary} size={EIconSize.Navbar} />
                            <Typography fontSize={ETypographyFontSize.Title}>Login</Typography>
                        </View>
                        <View style={styles.formContainer}>
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

                        </View>

                        <View style={styles.loginSubmitContainer}>
                            <Clutton text="Login" icon="login" onPress={submitForm} />
                            {
                                loginError 
                                ? <Typography 
                                    style={{ textAlign: "center" }}
                                    theme={ETypographyTheme.Error}
                                  >
                                        { loginError }
                                  </Typography>
                                : null
                            }
                        </View>
                    </CenterContainer>
                )
            }
        </Formik>
    )
};

const styles = StyleSheet.create({
    container: {
        gap: 48
    },
    loginSubmitContainer: {
        gap: 16
    },
    formContainer: {
        gap: 32
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 12
    }
})

export default LoginPage;