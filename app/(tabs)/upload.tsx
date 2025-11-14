import Clutton from "@/components/clutton/Clutton";
import Icon from "@/components/icon/Icon";
import { EIconSize, EIconTheme } from "@/components/icon/types";
import MediaInput from "@/components/inputs/MediaInput";
import { EMediaInputMode } from "@/components/inputs/types";
import WordInput from "@/components/inputs/WordInput";
import { ISongCard, ISongCardFormData } from "@/components/songCard/types";
import { ETypographyFontSize } from "@/components/typography/types";
import Typography from "@/components/typography/Typography";
import { generateID } from "@/utils/funcs";
import { local_UploadSong } from "@/utils/local";
import { Formik } from "formik";
import { StyleSheet, View } from "react-native";
import * as YUP from "yup";

const UploadTab = () => {
    const songValidationSchema = YUP.object<ISongCard>().shape({
        title: YUP.string().required(),
        author: YUP.string().required(),
        image: YUP.mixed().required(),
        audio: YUP.mixed().required(),
    });

    async function uploadSong(v: ISongCardFormData, resetFormFunc: any) {
        await local_UploadSong({ 
            ...v, 
            id: generateID(), 
            dateCreated: new Date().toString(),
            isFavorite: false
        });

        resetFormFunc();
    }

    return(
        <Formik
            validationSchema={songValidationSchema}
            initialValues={{ title: "", author: "", image: "", audio: "" }}
            onSubmit={(v, formik) => uploadSong(v, formik.resetForm)}
        >
            {
                ({ handleChange, handleBlur, setFieldValue, submitForm, resetForm, values,  errors }) => (
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

                            <MediaInput 
                                icon="image"
                                mode={EMediaInputMode.Image} 
                                value={values.image}
                                error={errors.image}
                                placeholder="Upload Image File" 
                                onInput={handleChange("image")} 
                            />

                            <MediaInput 
                                icon="volume-high"
                                mode={EMediaInputMode.Document} 
                                value={values.audio}
                                error={errors.audio}
                                placeholder="Upload Audio File" 
                                onInput={handleChange("audio")} 
                            />
                        </View>

                        <Clutton text="Submit" icon="upload" onPress={submitForm} />
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