import { IApiEror, ILoginForm } from "@/api/types";
import { UserAPI_Login } from "@/api/userApi";
import Anchor from "@/components/anchor/Anchor";
import { AuthUserContext } from "@/components/auth/AuthProvider";
import Card from "@/components/card/Card";
import { ECardBorderThicknessMode, ECardPaddingMode } from "@/components/card/types";
import Clutton from "@/components/clutton/Clutton";
import CenterContainer from "@/components/containers/CenterContainer";
import Icon from "@/components/icon/Icon";
import { EIcon_Size, EIcon_Theme } from "@/components/icon/types";
import WordInput from "@/components/inputs/WordInput";
import { ETypography_FontSize, ETypography_Theme } from "@/components/typography/types";
import Typography from "@/components/typography/Typography";
import { loginValidationSchema_Yup } from "@/server/src/routes/user/schemas";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";

const LoginPage = () => {
    const router = useRouter();
    const { login } = useContext(AuthUserContext)!;
    const [loginError, setLoginError] = useState<string | null>(null);

    function handleSubmit(v: ILoginForm) {
        UserAPI_Login(v)
            .then(res => login(res.data.user, res.data.token))
            .catch((err: IApiEror) => setLoginError(err.error));
    }
    
    return(
        <Formik 
            validationSchema={loginValidationSchema_Yup}
            initialValues={{ username: "", password: "" }}
            onSubmit={handleSubmit}
        >
            {
                ({ handleChange, handleBlur, submitForm, values, errors }) => (
                    <CenterContainer>
                        <Card 
                            style={styles.container} 
                            borderThicknessMode={ECardBorderThicknessMode.Thin}
                            paddingMode={ECardPaddingMode.Large}
                        >
                            <View style={styles.titleContainer}>
                                <Icon name="login" theme={EIcon_Theme.Primary} size={EIcon_Size.Huge} />
                                <Typography fontSize={ETypography_FontSize.Title}>
                                    Login
                                </Typography>
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
                                    ? (
                                        <Typography 
                                            style={{ textAlign: "center" }}
                                            theme={ETypography_Theme.Error}
                                        >
                                            { loginError }
                                        </Typography>
                                    )
                                    : null
                                }
                                <Anchor text="Don't have an account?" href="./signup" />
                            </View>
                        </Card>
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