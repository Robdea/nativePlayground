import { View, Text, Pressable,StyleSheet } from "react-native";
import {RenderProjectOptions, RenderProjects} from "../../src/components/RenderProjects.jsx";

export default function ManamegtPro() {    
    return(
        <View style={styles.cont}>
            <RenderProjectOptions/>
        </View>
    )
};

const styles = StyleSheet.create({
    cont:{ 
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 15
    },
    bttn: {
        marginBottom: 20
    },
    text:{
        fontSize: 18,
        color: "blue"
    }

})

