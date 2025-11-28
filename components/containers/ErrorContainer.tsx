import { StyleSheet, View } from "react-native";
import Clutton from "../clutton/Clutton";
import { ETypographyFontSize, ETypographyTheme } from "../typography/types";
import Typography from "../typography/Typography";
import CenterContainer from "./CenterContainer";
import { IErrorContainer } from "./types";

const ErrorContainer = (props: IErrorContainer) => {
    return(
        <CenterContainer style={styles.container}>
            <Typography 
                style={{ textAlign: "center" }} 
                fontSize={ETypographyFontSize.Title}
                theme={ETypographyTheme.Error}
            >
                Something went wrong
            </Typography>
            
            <View style={styles.buttonContainer}>
                { 
                    props.retryFn 
                    ? <Clutton text="Retry" onPress={props.retryFn} icon="reload" /> 
                    : null 
                }
                { 
                    props.goBackFn 
                    ? <Clutton text="Go Back" onPress={props.goBackFn} icon="arrow-left" /> 
                    : null 
                }
            </View>
        </CenterContainer>
    )
};

const styles = StyleSheet.create({
    container: {
        gap: 24
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        gap: 16
    }
})

export default ErrorContainer;