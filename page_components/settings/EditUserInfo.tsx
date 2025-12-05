import { IEditUserForm } from "@/api/types";
import { UserAPI_EditUser } from "@/api/userApi";
import { AuthUserContext } from "@/components/auth/AuthProvider";
import Card from "@/components/card/Card";
import { ECardBorderThicknessMode, ECardPaddingMode } from "@/components/card/types";
import Clutton from "@/components/clutton/Clutton";
import { ECluttonBorderRadius } from "@/components/clutton/types";
import WordInput from "@/components/inputs/WordInput";
import { ETypography_FontSize } from "@/components/typography/types";
import Typography from "@/components/typography/Typography";
import { loginValidationSchema_Yup } from "@/server/src/routes/user/schemas";
import * as SecureStore from "expo-secure-store";
import { Formik } from "formik";
import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";

const EditUserInfo = () => {
    const { user } = useContext(AuthUserContext)!;
    const [disableSaveButton, setDisableSaveButton] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleUserEditSubmit(v: IEditUserForm) {
        setLoading(true);

        const tok = await SecureStore.getItemAsync("tok");
        UserAPI_EditUser(v, tok!)
            .then(() => {
                setLoading(false);
                setDisableSaveButton(true);
            })
            .catch(err => {
                setLoading(false);
                setDisableSaveButton(false);
            })
    }

    return(
        <Card 
            style={styles.formContainer}
            borderThicknessMode={ECardBorderThicknessMode.Thin}
            paddingMode={ECardPaddingMode.Medium}
        >
            <Typography fontSize={ETypography_FontSize.Title}>My Account</Typography>

            <Formik 
                validationSchema={loginValidationSchema_Yup}
                initialValues={{ username: user!.username, password: "" }}
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
                                disabled={disableSaveButton}
                                loading={loading}
                            />
                        </View>
                    )
                }
            </Formik>
        </Card>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        gap: 16
    },
    innerFormContainer: {
        gap: 24
    },
})

export default EditUserInfo;