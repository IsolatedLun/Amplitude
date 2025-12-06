import { SongAPI_FetchSong, SongAPI_UpdateSong } from "@/api/songApi";
import { ISongForm } from "@/api/types";
import ErrorContainer from "@/components/containers/ErrorContainer";
import LoadingContainer from "@/components/containers/LoadingContainer";
import SongForm from "@/components/forms/SongForm";
import { ESongFormikMode } from "@/components/forms/types";
import { useRequest } from "@/hooks/request";
import { ISong } from "@/server/src/routes/types";
import { File, Paths } from "expo-file-system";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";


const EditTab = () => {
    const { id } = useLocalSearchParams();
    const { loading, data, error } = useRequest(fetchSong(id as string), {}, true);
    const [loadedInitialValues, setLoadedInitialValues] = useState<ISongForm | null>(null);
    const router = useRouter();
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if(data && !loading) {
            loadInitialValues(data);
        }
    }, [data, loading])

    async function loadInitialValues(v: ISong) {
        const imageDownloadFile = await File.downloadFileAsync(v.image, Paths.cache, { idempotent: true });
        const audioDownloadFile = await File.downloadFileAsync(v.audio, Paths.cache, { idempotent: true });

        setLoadedInitialValues({
            title: data.title,
            author: data.author,
            image: { uri: imageDownloadFile.uri, name: "temp.jpg", type: imageDownloadFile.type },
            audio: { uri: audioDownloadFile.uri, name: "temp.mp3", type: audioDownloadFile.type }
        });
    }

    function fetchSong(_id: string) {
        return () => SongAPI_FetchSong(_id);
    }
    

    async function editSong(v: ISongForm, resetFormFunc: any) {
        const data = new FormData();
        data.append("title", v.title);
        data.append("author", v.author);
        data.append("image", v.image as any);
        data.append("audio", v.audio as any);

        setIsUploading(true);
        SongAPI_UpdateSong(id as string, data)
            .then(() => router.replace("/(tabs)/songs"))
            .catch(err => console.error(err))
            .finally(() => setIsUploading(false));
    }

    return loading || !loadedInitialValues
    ? <LoadingContainer />
    : error
        ? <ErrorContainer goBackFn={() => router.replace("/(tabs)/songs")} />
        : <SongForm 
            mode={ESongFormikMode.Edit}
            isSubmitting={isUploading}
            initialValues={loadedInitialValues}
            onSubmit={editSong} 
        />
};



export default EditTab;