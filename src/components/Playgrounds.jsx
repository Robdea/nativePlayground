import { useContext, useState } from "react";
import { Pressable, TextInput, Text, View, StyleSheet } from "react-native";
import { GlobalContextPlayground } from "../context/contexts.jsx";
import ButtonChange from "../utils/ButtonChange.jsx";


export const Playgrounds = ({style}) =>{
    const {html, setHtml, css, setCss, js, setJs, generateDocHtml} = useContext(GlobalContextPlayground);
    const [activeStatus, setActiveStatus] = useState("Html")

    return(
        <View style={[styles.playground, style]}>
            
            <View style={styles.sectionOpt}>
               <View style={styles.optionsEnv}>
                    <ButtonChange
                        nameBttn={"Html"}
                        setState={setActiveStatus}
                    />
                    <ButtonChange
                        nameBttn={"Css"}
                        setState={setActiveStatus}
                    />
                    <ButtonChange
                        nameBttn={"Js"}
                        setState={setActiveStatus}
                    />
               </View> 
                <Pressable
                    onPress={generateDocHtml}
                >
                    <Text style={styles.pr}>Run</Text>
                </Pressable>           
            </View>

            { activeStatus === "Html" && (
                <TextInput 
                placeholder="html"
                multiline
                value={html}
                onChangeText={setHtml}
                />
            )}
            { activeStatus === "Css" && (
                <TextInput 
                placeholder="css"
                multiline
                value={css}
                onChangeText={setCss}
                />
            )}
            { activeStatus === "Js" && (
               <TextInput 
               placeholder="js"
               multiline
               value={js}
               onChangeText={setJs}
               /> 
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    playground: {
        backgroundColor: "#fff",
        color: "#fff",
        width: 380,
        borderRadius: 10,
    },
    optionsEnv:{
        flexDirection:"row",
        flexWrap: "wrap",
        gap:20
    },
    sectionOpt:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 3,
        fontSize: 10    
    },
    pr:{
        fontSize:20,
    },
    bttn:{
        backgroundColor: "#fff",
        padding:2.5,
        borderTopLeftRadius: 9,
        borderTopEndRadius: 1
    }
})
