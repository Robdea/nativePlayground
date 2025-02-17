import Spiner from "../Spiner";
import { StyleSheet, Modal, View } from "react-native";

export default function ModalSpiner({isTransparent}) {
    
    return(
        <Modal  transparent={isTransparent} animationType="fade">
        <View style={styles.container}>
            <Spiner style={styles.spiner} size={100} />
        </View>
      </Modal>
    )
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.2)"
    },
})
