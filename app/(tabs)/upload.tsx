import Icon from "@/components/icon/Icon";
import { EIcon_Size, EIcon_Theme } from "@/components/icon/types";
import ImageInput from "@/components/inputs/ImageInput";
import WordInput from "@/components/inputs/WordInput";
import { ETypography_FontSize } from "@/components/typography/types";
import Typography from "@/components/typography/Typography";
import { SERVER_URL } from "@/utils/global";
import { Formik } from "formik";
import { ScrollView, StyleSheet, View } from "react-native";
import * as YUP from "yup";

const UploadTab = () => {
    const songValidationSchema = YUP.object<any>().shape({
        title: YUP.string().required(),
        author: YUP.string().required(),
        image: YUP.mixed().required(),
        audio: YUP.mixed().required(),
    });

    async function uploadSong(v: any, resetFormFunc: any) {
        const data = new FormData();
        data.append("file", { uri: v.image, name: "", type: "" } as any)
        data.append("title", v.title)
        
        await fetch(SERVER_URL + "/songs", { method: "POST", body: data })
            .then(x => console.log(x))
            .catch(err => console.log(err))
    }

    return(
        <ScrollView>
            <Formik
                validationSchema={songValidationSchema}
                initialValues={{ title: "", author: "", image: null, audio: null }}
                onSubmit={(v, formik) => uploadSong(v, formik.resetForm)}
            >
                {
                    ({ handleChange, handleBlur, setFieldValue, submitForm, resetForm, values,  errors }) => {

                        return (
                            <View style={styles.formContainer}>
                                <View style={styles.titleContainer}>
                                    <Icon name="wifi" size={EIcon_Size.Huge} theme={EIcon_Theme.Primary} />
                                    <Typography fontSize={ETypography_FontSize.Title}>
                                        Upload Music
                                    </Typography>
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

                                    <ImageInput 
                                        value={values.image}
                                        error={errors.image}
                                        onInput={(v: File | null) => setFieldValue("image", v)} 
                                    />

                                    {/* <MediaInput 
                                        icon="volume-high"
                                        mode={EMediaInputMode.Document} 
                                        value={values.audio}
                                        error={errors.audio}
                                        placeholder="Upload Audio File"
                                        onInput={handleChange("audio")} 
                                    /> */}
                                </View>
                            </View>
                        )
                    }
                }
            </Formik>
        </ScrollView>
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
    },
    editButtonContainer: {
        gap: 18
    }
})

export default UploadTab;