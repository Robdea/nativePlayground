import { Modal, View, Text, Pressable, StyleSheet } from "react-native";

export default function Problem({visible, setVisible, problemText}) {

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => setVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>{problemText}</Text>
                    <Pressable 
                        onPress={() => setVisible(false)}
                        >
                            <Text>Cerrar</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.1)", 
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
    },
    modalText: {
        fontSize:21,
        marginBottom: 20,
        textAlign: "center"
    },
    closeButton: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
    },
    closeText: {
        color: "white",
        fontWeight: "bold",
    },
});


