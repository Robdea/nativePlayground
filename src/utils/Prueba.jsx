import { Text, StyleSheet } from 'react-native';

export default function Prueba({ name }) {
    return (
        <Text style={styles.pr}>{name}</Text>
    );    
};

const styles = StyleSheet.create({
    pr: {
        fontSize: 20,
        color: "#000",
    },
});
