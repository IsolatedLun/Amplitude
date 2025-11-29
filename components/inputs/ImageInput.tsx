import { bytesToMB, capitalizeSentence } from '@/utils/funcs';
import { FileInfo } from 'expo-file-system';
import { getInfoAsync } from "expo-file-system/legacy";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Card from "../card/Card";
import Clutton from '../clutton/Clutton';
import Icon from '../icon/Icon';
import { EIcon_Size, EIcon_Theme } from '../icon/types';
import { ETypography_FontSize, ETypography_Theme } from '../typography/types';
import Typography from "../typography/Typography";
import { IImageInput } from './types';

const ImageInput = (props: IImageInput) => {
    const [preview, setPreview] = useState<string>("");
    const [showPreview, setShowPreview] = useState(true);
    const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);

    async function pickImage() {
        const req = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(!req.granted) return;

        const res = await ImagePicker.launchImageLibraryAsync({
            quality: 1,
            allowsEditing: true
        });
        if(res.canceled)
            return props.onInput(null);
        
        const uri: string = res.assets[0].uri;
        
        setPreview(uri);
        await getInfoAsync(uri).then(setFileInfo)
    }

    return(
        <View style={styles.container}>
            {
                preview && showPreview
                ? (
                    <Image 
                        source={{ uri: preview }} 
                        style={{ aspectRatio: "1", borderRadius: 12 }} 
                    />
                )
                : null
            }

            <TouchableOpacity onPress={pickImage}>
                <Card style={styles.uploadContainer}>
                    <View style={styles.uploadPlaceholderContainer}>
                        <Icon 
                            name={"image"} 
                            size={EIcon_Size.Medium} 
                            theme={EIcon_Theme.Muted} 
                        />
                        <Typography theme={ETypography_Theme.Muted}>
                            Upload Image File
                        </Typography>
                    </View>

                    {
                        fileInfo
                        ? (
                            <View style={styles.fileInfoContainer}>
                                <View style={{ flex: 1 }}>
                                    <Typography theme={ETypography_Theme.Muted}>
                                        Name: { fileInfo.uri!.split("/").pop()?.replaceAll("-", " ") }
                                    </Typography>
                                </View>
                                <Typography theme={ETypography_Theme.Muted}>
                                    Size: { bytesToMB(fileInfo.size!) }Mb
                                </Typography>
                            </View>
                        )
                        : null
                    }
                </Card>
            </TouchableOpacity>

            { props.error ? 
                <Typography
                    style={{ marginInlineStart: 8 }}
                    fontSize={ETypography_FontSize.Small}
                    theme={ETypography_Theme.Error}
                >
                    { capitalizeSentence(props.error) }
                </Typography> 
                : null
            }

            {
                preview 
                ? (
                    <Clutton 
                        text={showPreview ? "Close preview" : "Open Preview"}
                        onPress={() => setShowPreview(prev => !prev)} 
                        style={styles.previewButton} 
                    />
                )
                : null
            }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        gap: 8
    },
    uploadContainer: {
        gap: 10
    },
    uploadPlaceholderContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    previewButton: {
        marginInlineStart: "auto",
        marginBlockStart: 4
    },
    fileInfoContainer: {
        gap: 8
    }
})

export default ImageInput;