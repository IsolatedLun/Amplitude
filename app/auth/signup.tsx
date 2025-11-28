import Anchor from "@/components/anchor/Anchor";
import { IAuthUser } from "@/components/auth/types";
import Card from "@/components/card/Card";
import { ECardBorderThicknessMode, ECardPaddingMode } from "@/components/card/types";
import Clutton from "@/components/clutton/Clutton";
import CenterContainer from "@/components/containers/CenterContainer";
import Icon from "@/components/icon/Icon";
import { EIcon_Size, EIcon_Theme } from "@/components/icon/types";
import WordInput from "@/components/inputs/WordInput";
import { ETypography_FontSize } from "@/components/typography/types";
import Typography from "@/components/typography/Typography";
import { USER_VALIDATION_SCHEMA } from "@/utils/global";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { StyleSheet, View } from "react-native";

const SignUpPage = () => {
    const router = useRouter();

    function handleSubmit(v: IAuthUser) {
        
    }
    
    return(
        <Formik 
            validationSchema={USER_VALIDATION_SCHEMA}
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
                                <Typography fontSize={ETypography_FontSize.Title}>Sign up</Typography>
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
                                <Clutton text="Sign up" icon="plus" onPress={submitForm} />
                                <Anchor text="Already have an account?" href="./login" />
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

export default SignUpPage;