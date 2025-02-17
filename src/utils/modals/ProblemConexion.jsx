import { useNetInfo } from "@react-native-community/netinfo";
import { Modal, View, Text } from "react-native";

export default function ProblemConexion() {
    const netInfo = useNetInfo();

    return (
      <Modal visible={visible} animationType="slide">
        <View style={styles.container}>
          <Text>{problemText}</Text>
          {!netInfo.isConnected && (
            <Text style={styles.error}>No hay conexión a Internet</Text>
          )}
        </View>
      </Modal>
    );
};
