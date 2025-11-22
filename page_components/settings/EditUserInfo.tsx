import { AuthUserContext } from "@/components/auth/AuthProvider";
import { IAuthUser } from "@/components/auth/types";
import Card from "@/components/card/Card";
import { ECardBorderThicknessMode, ECardPaddingMode } from "@/components/card/types";
import Clutton from "@/components/clutton/Clutton";
import { ECluttonBorderRadius } from "@/components/clutton/types";
import WordInput from "@/components/inputs/WordInput";
import { ETypographyFontSize } from "@/components/typography/types";
import Typography from "@/components/typography/Typography";
import { USER_VALIDATION_SCHEMA } from "@/utils/global";
import { local_editMockUser } from "@/utils/local";
import { Formik } from "formik";
import { useContext } from "react";
import { StyleSheet, View } from "react-native";

const EditUserInfo = () => {
    const { user } = useContext(AuthUserContext)!;

    function handleUserEditSubmit(v: IAuthUser) {
        local_editMockUser(v);
    }

    return(
        <Card 
            style={styles.formContainer}
            borderThicknessMode={ECardBorderThicknessMode.Thin}
            paddingMode={ECardPaddingMode.Medium}
        >
            <Typography fontSize={ETypographyFontSize.Title}>My Account</Typography>

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