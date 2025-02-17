import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import { getInfoUser, useAuth} from "../../src/database/firebaseAction";
import { auth } from "../../src/database/firebaseConfig";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import Spiner from "../../src/utils/Spiner.jsx";
import { useTheme, widthPorcen, heightPorcen } from "../../src/context/ThemeProvider.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function userProfile() {
    // const userAuth = useAuth();
    const router = useRouter()
    
    const {isDarkMode, lightStyle, darkStyle} = useTheme()
        
    const themeStyle = isDarkMode ? darkStyle : lightStyle


    const {userInfo,loading}  = getInfoUser();
    
    console.log(userInfo)
        const handlerSignOut = async () =>{
            await signOut(auth)
            await AsyncStorage.removeItem("authUser")
            router.replace("/")
        }
    
    return(
        <View style={styles.userContainer}>
            {userInfo ? (
                <View style={[themeStyle.userCard, styles.user]} >
                    
                    <Text> Nombre de usuario {userInfo.username}</Text>
                    
                    <Text> Email {userInfo.email}</Text>
                    <Text> Email {userInfo.userId}</Text>
                </View>
                ) : <Spiner/>}

            <View style={styles.contBtnn}>
                <Pressable style={[themeStyle.buttons, styles.bttns]} onPress={handlerSignOut}>
                    <Text style={themeStyle.bttnText} >Salir de la sesion</Text>
                </Pressable>
                <Pressable style={[themeStyle.bttnImportant, styles.bttns]} onPress={handlerSignOut}>
                    <Text style={themeStyle.bttnText}>Eliminar cuenta</Text>
                </Pressable>
            </View>
        </View>
    )
};

const {width, height} = Dimensions.get("window");


const styles = StyleSheet.create({
    user:{
        borderRadius: 20,
        width: width * 0.8,
        height: height * 0.3,
        alignItems: "center",
        justifyContent: "center"
    },
    userContainer:{
        marginTop: 15,
        alignItems: "center",
        gap: 20
    },
    contBtnn:{
        gap: 20
    },
    bttns: {
        padding: 10,
        width: width * 0.7,
        alignItems: "center"
    }
})
