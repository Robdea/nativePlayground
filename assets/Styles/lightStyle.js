import { StyleSheet, Dimensions } from "react-native";

const { width, height}= Dimensions.get("window")

export const lightStyle = StyleSheet.create({
    container:{
        backgroundColor: "#fefdff"
    },
    buttons:{
        backgroundColor:"#4A90E2",
        borderRadius: 20,
        padding: 10,
        width: width * 0.3,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 7.5 },
        shadowOpacity: 0.20,
        shadowRadius: 1.5,
        elevation: 4.5,
        alignItems:"center",
    },
    bttnImportant:{
        backgroundColor:"red",
        borderRadius: 20,
        padding: 10,
        width: width * 0.3,
        alignItems:"center",
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 7.5 },
        shadowOpacity: 0.20,
        shadowRadius: 1.5,
        elevation: 4.5,
    },
    text:{
        fontSize:16,
        color: "#1f1e1e",
    },
    importantText:{
        fontSize: 19,
        fontWeight:6000,
        color: "#1f1e1e"
    },
    bttnText:{
        fontSize:16,
        color: "#FfFffa"    
    },
    headers:{
        backgroundColor: "#EDc2e6",
    },
    projectCard:{
        backgroundColor: "#FffF",
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 7.5 },
        shadowOpacity: 0.20,
        shadowRadius: 2.5,
        elevation: 5.9,
    },
    userCard:{
        backgroundColor: "#FffF",
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 7.5 },
        shadowOpacity: 0.30,
        shadowRadius: 2.5,
        elevation: 15.9,
    },
    authCard:{
        
    },
    templateEditorCode:{

    },
    modals:{

    }  
})
