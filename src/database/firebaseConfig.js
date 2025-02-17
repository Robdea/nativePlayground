import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth} from "firebase/auth";
import { 
    getFirestore, 
    setDoc, 
    doc, 
    collection, 
    addDoc, 
    getDocs, 
    deleteDoc, 
    updateDoc, 
    getDoc,
} from "firebase/firestore";

import * as firebaseAuth from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAMHyEvFaUkLrw6q3yHXjjMWhvxrLD7kog",
  authDomain: "nativeplayg.firebaseapp.com",
  projectId: "nativeplayg",
  storageBucket: "nativeplayg.firebasestorage.app",
  messagingSenderId: "851696049760",
  appId: "1:851696049760:web:572b6544f561a973cbed05",
  measurementId: "G-XHG9CXLYJ9"
};

const getReactNativePersistence = firebaseAuth.getReactNativePersistence

// This initial the connection with the db 
export const app = initializeApp(firebaseConfig);

// this const allow connect to fireStore cloud. With this we can modific collections in the database.
export const db = getFirestore(app)

export const persistenUserInfo = async (userData) =>{
    try{
        if(userData){
            await AsyncStorage.setItem("userInfo", JSON.stringify({
                userId: userData.userId,
                email: userData.email,
                username: userData.usernam
            }))
            console.log("Se guardo la info")
        }else{
            await AsyncStorage.removeItem("userInfo")
        }
    }catch(er){
        console.error(er);
    }
}


export async function restoreUserInfo(setInfo) {
    try{
        const storedInfo = await AsyncStorage.getItem("userInfo");
        if (storedInfo) {
            const parsedUser = JSON.parse(storedInfo);
            console.log(parsedUser)
            setInfo(parsedUser);
        }
    }catch(e){
        console.error(e);
    }
};

// export const persistenProjects = async (projects) =>{
//     try{
//         if(projects){
//             await AsyncStorage.setItem("projects", JSON.stringify(projects))
//             console.log("Se guardo la info")
//         }else{
//             await AsyncStorage.removeItem("projects")
//         }
//     }catch(er){
//         console.error(er);
//     }
// }

// export async function restoreProjects(setProjects, setLoading){
//     setLoading(true)
//     try {
//         const projects = await AsyncStorage.getItem("projects")
  
//         if(projects){
//             const parsedProjects  = JSON.parse(projects)
//             console.log("A ver", parsedProjects)

//             setProjects(parsedProjects)
//         }
//     } catch (error) {
//         console.error(error);
//     }
//     finally{
//         setLoading(false)
//     }
// }

// This shit does the session able persistence idk no se puñetas ingles
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});


export async function loadProjects(userId){
    try {
        const allProjects = await getAllProjects(userId);
        // console.log(allProjects)
        return allProjects
    } catch (error) {
        console.error(error);
        return []
    }
}

// whit this function, we can add a new user in the colection users
export const addUser = async (userId, username, email, dateCreated)=>{
    const userData ={
        userId,
        username,
        email,
        dateCreated
    }   
    try {
        await setDoc(doc(db, "users", userId), userData);
        console.log("El usuario fue agregado")
    } catch (error) {
        console.error(error);
    }

}

export const deleteProject = async (userId, projectId) =>{
    try {
        const projectRef = doc(db, "users", userId, "projects", projectId);

        await deleteDoc(projectRef)

    } catch (e) {
        console.error(e);
    }
}

export const renameProject = async (newName, userId, projectId) =>{
    try {
        const projectRef = doc(db, "users", userId, "projects", projectId);
        
        await updateDoc(projectRef,{
            "name": `${newName}`
        })
        console.log("Se ha cambiado el nombre")
    } catch (e) {
        console.error(e);
    }
}

export const writeCode = async (userId, projectId, html,js, css, currentDate) =>{
    const contenProjectRef = doc(db, "users", userId, "projects", projectId, "contenProject", "codeData");

    try {
        const docSnap = await getDoc(contenProjectRef);

        if (docSnap.exists()) {
            // Si el documento ya existe, lo actualizamos
            await updateDoc(contenProjectRef, { html, css, js, currentDate });
            console.log("Contenido actualizado.");
          } else {
            // Si no existe, lo creamos
            await setDoc(contenProjectRef, { html, css, js, currentDate });
            console.log("Nuevo contenido creado.");
          }
    } catch (e) {
        console.error(e);
    }
}

export const getContet = async (userId, projectId) =>{
    const contenProjectRef = doc(db, "users", userId, "projects", projectId, "contenProject", "codeData");
    try{
        const contentProject = await getDoc(contenProjectRef);
        

        if(contentProject.exists()){
            const data = contentProject.data();

            const code = {html: data.html, css: data.css, js: data.js} 

            console.log(code)
    
            return code
        }
        else{
            console.log("Aun no habia contenido");
            return null
        }
    }catch(e){
        console.error(e);
        throw e
    }
}


export const createProject = async (name,userId, dateCreated) =>{

    const userRef = collection(db, "users", userId, "projects")


    try {
        const projectRef = await addDoc(userRef, {name, dateCreated, userId})
        
        const projectCreated = {id: projectRef.id, name}

        return projectCreated
    } catch (err) {
        console.error(err);
        return null
    }
}


export async function getAllProjects(userId) {
    const userRef = collection(db, "users", userId, "projects")


    try {
        // Me diante getDocs se puede tener todos los documentos de la colección
        const queyProjects = await getDocs(userRef)
        // Filtra los datos y los agrega a la constante project
        const projects = queyProjects.docs.map( p=>({
            id: p.id,
            ...p.data()
        }))
        // projects ahora tiene toda la informacion sobre los documentos
        console.log(projects)

        return projects
    } catch (error) {
        console.error(error);
        return []
    }
}
