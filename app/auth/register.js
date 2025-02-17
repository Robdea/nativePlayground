import { useState } from "react";
import { View, Text, Pressable, TextInput, Alert, Dimensions, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, addUser } from "../../src/database/firebaseConfig";
import { Stack, useRouter } from "expo-router";
import Spiner from "../../src/utils/Spiner.jsx";
import { Link } from "expo-router";
import { useTheme } from "../../src/context/ThemeProvider.jsx";
import { insertUser } from "../../src/database/local.js";
export default function Register() {
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState("")
    const [confirPassword, setConfirPassword] = useState("")


     const {isDarkMode, lightStyle, darkStyle} = useTheme()
                
    const themeStyle = isDarkMode ? darkStyle : lightStyle


    const handlerCreateUser = async ()=>{
        if(password !== confirPassword){
            Alert.alert("La contraseña debe de ser igual")
            return;
        }
        
        if (!email || !username || !password || !confirPassword) {
            Alert.alert("Error", "Todos los campos son obligatorios.");
            return;
        }

        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;

            console.log("Se ha ingresado al usuario: ", user.uid)

            const currentTime = new Date();
            await addUser(user.uid, username, email, currentTime);

            await insertUser(user.uid, username,email)

            router.replace('/')
        } catch (err) {
            console.error(err);     
            setLoading(true);
        }finally{
            setLoading(false);
        }
    }

    return(
        <View style={styles.main}>
            <Stack.Screen
                options={{
                    title:"Registro",
                    headerTransparent: true
                }}
            />

            <Text>Crea tu cuenta</Text>
            
            <View style={styles.container}>
                <Text>Email</Text>
                <TextInput 
                placeholder="Ingresa tu email"
                value={email} 
                onChangeText={setEmail}/>
                
                <Text>Nombre usuario</Text>
                <TextInput  
                placeholder="Ingresa un nombre de usuario"
                value={username} 
                onChangeText={setUsername}/>
                
                <Text>Contraseña</Text>
                <TextInput 
                placeholder="Ingresa una ontraseña" 
                value={password} 
                onChangeText={setPassword} />

                <Text>Confirmar contraseña</Text>
                <TextInput  
                placeholder="Confirma la contraseña"
                value={confirPassword} 
                onChangeText={setConfirPassword} />
            </View>
            
            <Pressable 
                style={[themeStyle.buttons, styles.bttn]}
                onPress={handlerCreateUser}
                disabled={loading}
            >
                <Text style={themeStyle.bttnText}>Crear usuario</Text>
            </Pressable>
            {loading && (
                <Spiner/>
            )}
            
            <View style={styles.separator} />


            <View>
                <Text>¿Ya tienes una cuenta? <Link asChild href={"/auth/login"}><Text>Iniciar sesion</Text></Link></Text>
            </View>
        </View>
    )
};


const {width, height} = Dimensions.get("window")

const styles = StyleSheet.create({
    container:{
        alignContent: "center",
    },
    card:{
        width,
        height
    },
    bttn:{
        width: width * 0.6
    },
    separator: {
        height: 2.5,                
        backgroundColor: '#ccc',  
        marginVertical: 30,
        width: width * 0.7,
        alignSelf: "center"       
    },
    main:{
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        marginTop: height * 0.1,
        padding: 7
    }
})


