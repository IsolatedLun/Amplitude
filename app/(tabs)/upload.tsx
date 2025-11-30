import { SongAPI_UploadSong } from "@/api/songApi";
import Clutton from "@/components/clutton/Clutton";
import { ECluttonTheme } from "@/components/clutton/types";
import Icon from "@/components/icon/Icon";
import { EIcon_Size, EIcon_Theme } from "@/components/icon/types";
import AudioInput from "@/components/inputs/AudioInput";
import ImageInput from "@/components/inputs/ImageInput";
import WordInput from "@/components/inputs/WordInput";
import { ETypography_FontSize } from "@/components/typography/types";
import Typography from "@/components/typography/Typography";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { ScrollView, StyleSheet, View } from "react-native";
import * as YUP from "yup";

const UploadTab = () => {
    const router = useRouter();
    const songValidationSchema = YUP.object<any>().shape({
        title: YUP.string().required(),
        author: YUP.string().required(),
        image: YUP.mixed().required(),
        audio: YUP.object().required(),
    });

    async function uploadSong(v: any, resetFormFunc: any) {
        const data = new FormData();
        data.append("title", v.title);
        data.append("author", v.author);
        data.append("image", {
            uri: v.image,
            name: "audio.jpg",
            type: "image/jpeg"
        } as any);
        data.append("audio", v.audio);

        SongAPI_UploadSong(data)
            .then(res => res.json())
            .then(body => router.replace(`/player/${body.id}`))
            .catch(err => console.log(err))
    }

    return(
        <ScrollView>
            <Formik
                validationSchema={songValidationSchema}
                initialValues={{ title: "", author: "", image: "", audio: "" }}
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
                                        onInput={handleChange("image")} 
                                    />

                                    <AudioInput 
                                        value={values.audio}
                                        error={errors.audio}
                                        onInput={v => setFieldValue("audio", v)} 
                                    />
                                </View>

                                <View style={styles.formButtonContainer}>
                                    <Clutton 
                                        text="Upload"
                                        icon="upload"
                                        onPress={submitForm}
                                    />
                                    <Clutton 
                                        text="Reset" 
                                        icon="restore" 
                                        theme={ECluttonTheme.Danger} 
                                        onPress={resetForm}
                                    />
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
    formButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
    }
})

export default UploadTab;