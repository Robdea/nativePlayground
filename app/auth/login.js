import { View, Text, TextInput, Pressable, StyleSheet, Image, Dimensions } from "react-native"
import { auth } from "../../src/database/firebaseConfig"
import { useRef, useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth";
import { Stack, useRouter } from "expo-router";
import Problem from "../../src/utils/modals/Problem.jsx";
import { errorsLogin } from "../../src/utils/TypeError.js";
import ModalSpiner from "../../src/utils/modals/ModalSpiner.jsx";
import { useTheme } from "../../src/context/ThemeProvider.jsx";
import { BlurView } from "expo-blur";

const img = require("../../assets/Login.jpg")

export default function Login() {
    const router = useRouter()
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");    
    const [loading, setLoading] = useState(false)
    const [visible, setVisible]= useState(false)
    const [errorMessage, setErrorMessage] =useState(true)

    // Previene que se pulse multiples veces segun
    const isButtonDisabled = useRef(false)

    const {isDarkMode, lightStyle, darkStyle} = useTheme()
                        
    const themeStyle = isDarkMode ? darkStyle : lightStyle


    const handlerLogin = async () =>{
        /* Para poder evaluar que la accion es llevada a cabo y poder mostrar
        un indicador de carga, se puede usar un estado y usar un renderizado condicional
        que solo aparezca cuando tarde en cargar la accion  
        */
        if (isButtonDisabled.current) return;
        isButtonDisabled.current = true;
        setLoading(true)
        // El formato de manejo de errores completo, se debe de ocupar de try a finally
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            
            const user = userCredential.user    
            console.log("El usuario ha ingresado: ", user)

            router.replace("/")
        } catch (error) {
            console.log("Ha ocurrido un error", error)
            console.log(error.code)
            errorsLogin(error.code, setErrorMessage)
            setVisible(true)

        } finally{
            setLoading(false)
            isButtonDisabled.current = false
        }
    }

    return(
        <View style={{ flexDirection: "column"}}>
            <Stack.Screen
                options={{
                    title: "Inicio de sesion"
                }}
            />

            <View style={{ position: 'relative' }}>
                <Image source={img}  style={styles.img}/>
                <BlurView    
                    intensity={256} 
                    tint="light"  
                    style={styles.efect}/>
            </View>

            <View style={styles.container}>
                <TextInput 
                    style={styles.input}
                    placeholder="Email"
                    value={email} 
                    onChangeText={setEmail}/>  

                <TextInput 
                    style={styles.input}
                    placeholder="Contraseña" 
                    value={password} 
                    onChangeText={setPassword} />
                
                <Pressable 
                style={[styles.bttn, themeStyle.buttons]} 
                onPress={handlerLogin}
                disabled={loading}
                >
                    <Text style={themeStyle.bttnText}>Iniciar sesion</Text>
                </Pressable>

                {loading && (<ModalSpiner isTransparent={false}/>)}

                <Problem visible={visible} 
                setVisible={setVisible} 
                problemText={errorMessage}
                />
            </View>
        </View>
    )
};

const {width, height} =Dimensions.get("window")

// #e8e8e8

const styles = StyleSheet.create({
    input: {
        backgroundColor: "#eee",
        padding: 10,
        marginVertical: 10,
        borderRadius: 10,
    },
    bttn: {
        backgroundColor: "#f43",
    }, 
    img:{
        width: width, 
        height: height * 0.2,
        resizeMode: "cover",
    },
    container:{
        backgroundColor: "#fff",
        width: width,
        height: height ,
    },
    efect:{
        backgroundColor: "#fff",
        width: width ,
        height: height * 0.049,
        opacity: 0.6,
        position: "absolute",
        backgroundColor: "#fff",
        bottom: 0,         
        left: 0,
        right: 0,    
    },
})
