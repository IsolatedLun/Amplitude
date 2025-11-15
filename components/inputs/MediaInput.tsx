import { capitalizeSentence, extractFileAssetData } from '@/utils/funcs';
import * as DocumentPicker from 'expo-document-picker';
import { File, Paths } from "expo-file-system";
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Card from "../card/Card";
import Icon from '../icon/Icon';
import { EIconSize, EIconTheme } from '../icon/types';
import { ETypographyFontSize, ETypographyTheme } from '../typography/types';
import Typography from "../typography/Typography";
import MediaInputFileDetails from './MediaInputDetails';
import { EMediaInputMode, IMediaInput, TFilePickerAsset } from './types';

const MediaInput = (props: IMediaInput) => {
    const [state, setState] = useState<string>("");
    const [fileState, setFileState] = useState<TFilePickerAsset | null>(null);

    useEffect(() => {
        if(!props.value)
            setFileState(null);
        else if(fileState === null) {
            const f = new File(Paths.cache, props.value)
            setFileState(({
                name: f.uri,
                size: 0,
            } as any));
        }

    }, [props.value])

    async function pickFile() {
        const res = await DocumentPicker.getDocumentAsync();
        if(res.canceled) return props.onInput("");
        
        updateState(res.assets[0]);
    }

    async function pickImage() {
        const req = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(!req.granted) return;

        const res = await ImagePicker.launchImageLibraryAsync({
            quality: 1
        });
        if(res.canceled)
            return props.onInput("");
        updateState(res.assets[0]);
    }

    function updateState(asset: TFilePickerAsset) {
        props.onInput(asset.uri);
        setState(asset.uri);
        setFileState(asset);
    }

    function handlePress() {
        switch(props.mode) {
            case EMediaInputMode.Document: pickFile(); break;
            case EMediaInputMode.Image: pickImage(); break;
        }
    }

    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={handlePress}>
                <Card style={styles.uploadContainer}>
                    <View style={styles.uploadPlaceholderContainer}>
                        <Icon 
                            name={props.icon ?? "file"} 
                            size={EIconSize.Tab} 
                            theme={EIconTheme.Muted} 
                        />
                        <Typography theme={ETypographyTheme.Muted}>
                            { props.placeholder }
                        </Typography>
                    </View>

                    {
                        state && fileState 
                        ? <MediaInputFileDetails {...extractFileAssetData(fileState)} />
                        : null
                    }
                </Card>
            </TouchableOpacity>
            { props.error ? 
                <Typography
                    style={{ marginInlineStart: 8 }}
                    fontSize={ETypographyFontSize.Small}
                    theme={ETypographyTheme.Error}
                >
                    { capitalizeSentence(props.error) }
                </Typography> 
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
    }
})

export default MediaInput;