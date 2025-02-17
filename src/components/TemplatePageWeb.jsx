import { useContext,  } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import WebView from "react-native-webview";
import { GlobalContextPlayground } from "../context/contexts.jsx";


export const TemplatePageWeb = ({style}) =>{
    const {preview} = useContext(GlobalContextPlayground)
    return(
            <View style={[styles.mainContainer,style]}>
                <WebView 
                style={styles.webview}
                originWhitelist={['*']}
                source={{html:preview}}
                />
            </View>
    );
}

const styles = StyleSheet.create({
    mainContainer:{
        alignItems: "center",
        justifyContent:"center"
    },
    webview: {
            width: 375,
            height:"auto"
        }
})

