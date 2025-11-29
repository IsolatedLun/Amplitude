import Clutton from "@/components/clutton/Clutton";
import { ECluttonTheme } from "@/components/clutton/types";
import Icon from "@/components/icon/Icon";
import { EIcon_Size, EIcon_Theme } from "@/components/icon/types";
import ImageInput from "@/components/inputs/ImageInput";
import MediaInput from "@/components/inputs/MediaInput";
import { EMediaInputMode } from "@/components/inputs/types";
import WordInput from "@/components/inputs/WordInput";
import { ISongCard, ISongCardFormData } from "@/components/songCard/types";
import { ETypography_FontSize } from "@/components/typography/types";
import Typography from "@/components/typography/Typography";
import { SERVER_URL } from "@/utils/global";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { Formik } from "formik";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import * as YUP from "yup";

const UploadTab = () => {
    const router = useRouter();
    const { editID } = useLocalSearchParams();
    const [songToEdit, setSongToEdit] = useState<ISongCard | null>(null);
    const songValidationSchema = YUP.object<ISongCard>().shape({
        title: YUP.string().required(),
        author: YUP.string().required(),
        image: YUP.string().required(),
        audio: YUP.string().required(),
    });

    async function uploadSong(v: ISongCardFormData, resetFormFunc: any) {
        const data = new FormData();
        data.append("file", { uri: v.image, name: "", type: "" } as any)
        data.append("title", v.title)
        
        await fetch(SERVER_URL + "/songs", { method: "POST", body: data })
            .then(x => console.log(x))
            .catch(err => console.log(err))
    }

    function cancelEditSong(resetFormFunc: any) {
        resetFormFunc();
        router.setParams({ editID: undefined });
        router.replace("/(tabs)/songs");
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
                        useFocusEffect(useCallback(() => {
                            if(editID !== null) {
                                // local_GetSong(editID as string)
                                //     .then(res => {
                                //         if(res !== null) {
                                //             const fields = ["title", "author", "image", "audio"];
                                //             fields.forEach(field => setFieldValue(field, (res as any)[field], false));
                                //             setSongToEdit(res);
                                //         }
                                //     })
                            }

                            return () => resetForm()
                        }, [editID]))

                        return (
                            <View style={styles.formContainer}>
                                <View style={styles.titleContainer}>
                                    <Icon name="wifi" size={EIcon_Size.Huge} theme={EIcon_Theme.Primary} />
                                    <Typography fontSize={ETypography_FontSize.Title}>
                                        { editID ? "Edit Music" : "Upload Music" }
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
                                        icon="image"
                                        mode={EMediaInputMode.Image}
                                        value={values.image}
                                        error={errors.image}
                                        placeholder={`${editID ? "Change" : "Upload"} Image File`}
                                        onInput={handleChange("image")} 
                                    />

                                    <MediaInput 
                                        icon="volume-high"
                                        mode={EMediaInputMode.Document} 
                                        value={values.audio}
                                        error={errors.audio}
                                        placeholder={`${editID ? "Change" : "Upload"} Audio File`} 
                                        onInput={handleChange("audio")} 
                                    />
                                </View>

                                {
                                    editID
                                    ? (
                                        <View style={styles.editButtonContainer}>
                                            <Clutton 
                                                text="Save changes" 
                                                icon="update" 
                                                onPress={() => null} 
                                            />
                                            <Clutton 
                                                theme={ECluttonTheme.Danger}
                                                text="Cancel" 
                                                icon="cancel" 
                                                onPress={() => cancelEditSong(resetForm)}
                                            />
                                        </View>
                                    )
                                    : <Clutton text="Submit" icon="upload" onPress={submitForm} />
                                }
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