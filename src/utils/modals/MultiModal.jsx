import { Modal, View, Text, Pressable, StyleSheet, Dimensions } from "react-native"
import { useTheme } from "../../context/ThemeProvider"


export const MultiModal= ({visible, setVisible, textAction, handlerAction, children}) =>{
    
    const {isDarkMode, lightStyle, darkStyle} = useTheme()
    

    const themeStyle = isDarkMode ? darkStyle : lightStyle

    
    return(
        <Modal
            transparent={true}
            visible={visible}
            onRequestClose={() => setVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={[themeStyle.container, styles.contInfo]}>
                    <Text>{textAction}</Text>
                    {children}
                    
                    <View style={styles.contBttns}>
                        <Pressable style={themeStyle.bttnImportant} onPress={() => setVisible(false)}>
                            <Text style={themeStyle.bttnText}>Cancelar</Text>
                        </Pressable>
                        <Pressable style={themeStyle.buttons} onPress={handlerAction}>
                            <Text style={themeStyle.bttnText}>Confirmar</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const {width, height}= Dimensions.get("window") 

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", 
    },
    contInfo:{
        padding: 15,
        width: width * 0.7,
        borderRadius: 20,
        height: height * 0.25,
        justifyContent: "center",
        alignItems: "center",
        gap: 15
    },
    btt:{
        width: width * 0.3,
        alignItems:"center",
    },
    contBttns:{
        flexDirection: "row",
        gap: 5
    }
})
