import { Modal, View, StyleSheet, Text, Pressable, TextInput } from "react-native";
import { useState } from "react";
import { createProject, loadProjects } from "../../database/firebaseConfig";
import { useAuth } from "../../database/firebaseAction";
import { useProjectsContext } from "../../context/ProjectsContext";
import Spiner from "../Spiner";
import { useTheme } from "../../context/ThemeProvider";

export default function ModalCreateProject({modalVisible, setModalVisible}) {
    const [nameProject, setNameProject] = useState("");

    const {addProject} = useProjectsContext();

    const {isDarkMode, lightStyle, darkStyle} = useTheme()
    const themeStyle = isDarkMode ? darkStyle : lightStyle

    const [err, setError] = useState(false)
    const [loadingConfirm, setLoadingConfirm] = useState(false);
    const {user, loading} = useAuth()


    async function handlerCreate () {
        const currentDate = new Date();
        setLoadingConfirm(true);
        setError(false)
        const correctName = nameProject.trim()
 

        if(correctName){            
            try {
                const project = await createProject(correctName, user.uid, currentDate);
                addProject(project);


                console.log(project);

            } catch (error) {
                console.error(error);
                
            }finally{
                setModalVisible(false);
                setLoadingConfirm(false);
                setNameProject("");
            }
        }
        else{
            console.log("El proyecto debe de tener un nombre")
            setLoadingConfirm(false)
            setError(true)
        }
    }

    function close(){
        setModalVisible(false)
        setError(false)
    }

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Ingresa el nombre del proyecto</Text>
                                
                        <TextInput
                            value={nameProject}
                            onChangeText={setNameProject}
                            placeholder="Nombre del proyecto"
                        />
                        <View style={styles.containerBttns}>
                            <Pressable 
                                style={themeStyle.bttnImportant}
                                onPress={close}
                            >
                                <Text style={styles.closeText}>Cerrar</Text>
                            </Pressable>

                            <Pressable 
                                style={themeStyle.buttons}
                                onPress={handlerCreate}
                            >
                                <Text style={styles.closeText}>Aceptar</Text>
                            </Pressable>
                        </View>

                        {loadingConfirm && (<Spiner/>)}
                        {err && (<Text>El proyecto debe de tener nombre</Text>)}
                    </View>
            </View>
        </Modal>
    )
};


const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", 
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
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
    containerBttns:{
        flexDirection: "row",
        gap: 10
    }
});


