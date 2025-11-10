import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import { TRotatable } from "./types";

const Rotatable = (props: TRotatable) => {
    const rotateValue = useRef(new Animated.Value(0)).current;
    const rotate = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"]
    })

    useEffect(() => {
        Animated.loop(
            Animated.timing(rotateValue, {
                duration: props.duration ?? 5000,
                easing: Easing.linear,
                useNativeDriver: true,
                toValue: 1
            })
        ).start()
    }, [])
    
    return(
        <Animated.View style={{ transform: [{ rotate }] }}>
            { props.children }
        </Animated.View>
    )
};

export default Rotatable;