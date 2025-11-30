import Slider from "@react-native-community/slider";
import { useContext } from "react";
import { ColorSchemeContext } from "../scheme/ColorSchemeProvider";
import { ISongSlider } from "./types";

const SongSlider = (props: ISongSlider) => {
    const { state: { themes } } = useContext(ColorSchemeContext)!;

    return(
        <Slider
            style={{ flex: 1 }}
            thumbTintColor={themes.sliderPrimary.color!}
            minimumTrackTintColor={themes.sliderPrimary.color!}
            maximumTrackTintColor={themes.sliderPrimary.backgroundColor}
            onValueChange={props.onChange}

            value={props.value}
            minimumValue={0} 
            maximumValue={1}
        />
    )
};

export default SongSlider;