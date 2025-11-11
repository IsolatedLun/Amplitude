import WordInput from "@/components/inputs/WordInput";
import { View } from "react-native";

const SongsTab = () => {
    return(
        <View>
            <WordInput value="" placeholder="Enter song name" title="Title" />
        </View>
    )
};

export default SongsTab;