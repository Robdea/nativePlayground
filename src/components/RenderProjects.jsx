import { Pressable, View, Text, ScrollView, TextInput, StyleSheet, Dimensions } from "react-native";
import { Link } from "expo-router";
import Spiner from "../utils/Spiner";
import { useProjectsContext } from "../context/ProjectsContext";
import { deleteProject, renameProject } from "../database/firebaseConfig";
import { MultiModal } from "../utils/modals/MultiModal";
import { useState } from "react";
import { useTheme } from "../context/ThemeProvider";
import ModalSpiner from "../utils/modals/ModalSpiner";
import { getInfoUser, useAuth } from "../database/firebaseAction";


export function RenderProjects() {
    const {projects, loadingProjects} = useProjectsContext()

    const {isDarkMode, lightStyle, darkStyle} = useTheme()
    
    const themeStyle = isDarkMode ? darkStyle : lightStyle

    const [search, setSearch] = useState("")

    // Filter to search a proyect by its name
    const filteredProjects = search.trim()
    // Filter projects 
    ? projects.filter(project =>
        //  Search by character. Includes all proyects with the same character in the input
        project.name.toLowerCase().includes(search.toLowerCase())
      )
    : projects;


    console.log(projects)
    return(
        <View>
              <TextInput
                placeholder="Nombre del proyecto"
                value={search}
                onChangeText={setSearch}
                />
            <ScrollView style={styles.scrollContainer}>
            { loadingProjects? (<Spiner />):( 
                <View style={styles.containerLink}>
                    {filteredProjects.map((project) => 
                        <Link style={[styles.projectFiel,themeStyle.projectCard]} asChild href={`${project.id}-${project.name}`} key={project.id}>
                            <Pressable>
                                <Text>{project.name}</Text>
                            </Pressable>
                        </Link>
                    )} 
                </View> )}
            </ScrollView>    
        </View>
    )
};

export const RenderProjectOptions = () =>{
    const {projects, loadingProjects, loadProjects} = useProjectsContext();

    const [visibleModal, setVisibleModal] =useState(false)
    
    const {isDarkMode, lightStyle, darkStyle} = useTheme()
    
    // const {userInfo, loading} = getInfoUser()
    const {user, loading} = useAuth()
    
    const themeStyle = isDarkMode ? darkStyle : lightStyle



    const [modalState, setModalState] =useState({
        visible: false,
        action: null,
        projectId: null,
        newName:""
    })

    const openModal= (action, projectId=null) =>{
        setModalState({
            visible: true, 
            action, 
            projectId, 
            newName:""})
    }


    const closeModal = () => {
        setModalState({ ...modalState, visible: false });
    };

    const handlerDelete = async ()=>{
        if(modalState.projectId){
            setVisibleModal(true)
            try{
                await deleteProject(user.uid, modalState.projectId)
                loadProjects();
                closeModal()
            }
            catch(e){
                console.log(e)
            }
            finally{
                setVisibleModal(false)
            }
        }
    }

    const handlerRename = async () =>{
        if(modalState.projectId){

            const correctName = modalState.newName.trim()

            setVisibleModal(true)
            try{
                if(correctName){
                    await renameProject(correctName, user.uid, modalState.projectId);
                    loadProjects();
                    closeModal();
                }else{  
                    console.log("El nuevo nombre no debe de estar vacio")
                }
            }
            catch(e){
                console.error(e);
            }finally{   
                setVisibleModal(false)
            }   
        }
    }
    return(
        <ScrollView>
            {loadingProjects ? (<Spiner/>) : (
                <View style={styles.container}>
                    {projects.map((project) => 
                        <View style={[themeStyle.projectCard,, styles.carProject]} key={project.id}>
                            <Text>{project.name}</Text>
                            <View>
                                <Pressable onPress={() => openModal("delete", project.id)}>
                                    <Text>Eliminar</Text>
                                </Pressable>    
                                <Pressable onPress={() => openModal("update", project.id)}>
                                    <Text>Cambiar nombre</Text>
                                </Pressable>    
                            </View>  
                        </View>
                    )}
                </View>
                )
            }
            <MultiModal
                visible={modalState.visible}
                setVisible={closeModal}
                textAction={
                    modalState.action === "delete"? 
                    "¿Estás seguro de eliminar este proyecto?"
                    : "Ingresa el nuevo nombre del proyecto"
                }
                handlerAction={modalState.action === "delete" ? handlerDelete : handlerRename}
                >
                {modalState.action === "update" &&(
                    <TextInput
                        value={modalState.newName}
                        onChangeText={(text) => setModalState({...modalState, newName: text})}
                        placeholder="Ingresa el nuevo nombre"
                    />
                )}
            </MultiModal>
          
                {visibleModal && (<ModalSpiner isTransparent={true} />)}
        </ScrollView>
    )
}

const {width, height} = Dimensions.get("window")


const styles = StyleSheet.create({
    container:{
        gap: 17
    },
    containerLink:{
        gap: 17,
        justifyContent: "center",
        flexDirection: "row",
        flexWrap:"wrap",
    },
    carProject:{
        flexDirection: "row",
        justifyContent:"space-between",
        borderRadius: 18,
        padding: 14,
        width: width * 0.87,
    },
    projectFiel:{
        width: width * 0.35,
        height: height * 0.11,
        gap: 20,
        borderRadius: 8,
        borderEndEndRadius: 27,
        alignItems: "flex-end",
        justifyContent: "flex-end",
        padding: 6
    },
    scrollContainer:{
        width: width * 0.8,
    },
    containerProjects:{
        gap:20,
        padding: 10,
    },
})
