import { Modal, StyleSheet, TouchableOpacity } from "react-native";
import Card from "../card/Card";
import { ECardBorderThicknessMode } from "../card/types";
import { ETypography_Theme } from "../typography/types";
import Typography from "../typography/Typography";
import { IMModal } from "./types";

const MModal = (props: IMModal) => {
    return(
        <Modal 
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
            animationType="slide"
            backdropColor="hsla(0 0% 0% / 0.3)"
            visible={props.open}
        >
        <Card style={styles.modalContainer} borderThicknessMode={ECardBorderThicknessMode.Thin}>
            { props.children }

            <TouchableOpacity onPress={props.closeFn}>
                <Typography 
                    theme={ETypography_Theme.Primary} 
                    style={styles.modalCloseText}>
                        Cancel
                </Typography>
            </TouchableOpacity>
        </Card>
    </Modal>
    )
};

const styles = StyleSheet.create({
    modalContainer: {
        margin: "auto",
        width: "90%"
    },
    modalCloseText: {
        marginInlineStart: "auto",
        marginBlockStart: 20
    }
})

export default MModal;