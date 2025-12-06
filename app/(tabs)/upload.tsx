import { SongAPI_UploadSong } from "@/api/songApi";
import SongForm from "@/components/forms/SongForm";
import { ESongFormikMode } from "@/components/forms/types";
import { useRouter } from "expo-router";
import { useState } from "react";


const UploadTab = () => {
    const router = useRouter();
    const [isUploading, setIsUploading] = useState(false);
    

    async function uploadSong(v: any, resetFormFunc: any) {
        const data = new FormData();
        data.append("title", v.title);
        data.append("author", v.author);
        data.append("image", v.image);
        data.append("audio", v.audio);

        setIsUploading(true);
        SongAPI_UploadSong(data)
            .then(res => res.json())
            .then(body => router.replace(`/player/${body.id}`))
            .catch(err => console.log(err))
            .finally(() => setIsUploading(false));
    }

    return(
        <SongForm 
            mode={ESongFormikMode.Upload}
            isSubmitting={isUploading}
            initialValues={{ 
                title: "", 
                author: "", 
                image: null, 
                audio: null
            }}
            onSubmit={uploadSong} 
        />
    )
};



export default UploadTab;