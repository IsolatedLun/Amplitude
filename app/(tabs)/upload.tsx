import Clutton from "@/components/clutton/Clutton";
import Icon from "@/components/icon/Icon";
import { EIconSize, EIconTheme } from "@/components/icon/types";
import WordInput from "@/components/inputs/WordInput";
import { ISongCard } from "@/components/songCard/types";
import { ETypographyFontSize } from "@/components/typography/types";
import Typography from "@/components/typography/Typography";
import { Formik } from "formik";
import { StyleSheet, View } from "react-native";
import * as YUP from "yup";

const UploadTab = () => {
    const songValidationSchema = YUP.object<ISongCard>().shape({
        title: YUP.string().required(),
        author: YUP.string().required(),
        image: YUP.mixed().required(),
        audio: YUP.mixed().required(),
    })

    return(
        <Formik
            validationSchema={songValidationSchema}
            initialValues={{ title: "", author: "", image: "", audio: "" }}
            onSubmit={v => console.log(v)}
        >
            {
                ({ handleChange, handleBlur, setFieldValue, submitForm, values,  errors }) => (
                    <View style={styles.formContainer}>
                        <View style={styles.titleContainer}>
                            <Icon name="wifi" size={EIconSize.Navbar} theme={EIconTheme.Primary} />
                            <Typography fontSize={ETypographyFontSize.Title}>Upload Music</Typography>
                        </View>

                        <View style={styles.formInputContainer}>
                            <WordInput
                                title="Title"
                                placeholder="Enter song title"
                                value={values.title}
                                error={errors.title}

                                onInput={handleChange("title")}
                                onBlur={handleBlur("title")}
                            />

                            <WordInput 
                                title="Author"
                                placeholder="Enter author's name"
                                value={values.author}
                                error={errors.author}

                                onInput={handleChange("author")}
                                onBlur={handleBlur("author")}
                            />
                        </View>

                        <Clutton text="Submit" icon="upload" />
                    </View>
                )
            }
        </Formik>
    )
};

const styles = StyleSheet.create({
    formContainer: {
        gap: 24
    },
    formInputContainer: {
        gap: 22
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 12
    }
})

export default UploadTab;