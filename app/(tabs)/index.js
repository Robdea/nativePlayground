import { View, Text, StyleSheet, Pressable, TextInput} from "react-native";
import { useState } from "react";
import { getInfoUser, useAuth } from "../../src/database/firebaseAction";
import { Stack } from "expo-router";
import { AuthBttns, CreateProject } from "../../src/components/CompoIndex.jsx";
import {RenderProjects} from "../../src/components/RenderProjects.jsx";
import { useTheme } from "../../src/context/ThemeProvider.jsx";


export default function Index() {     
    const [visible, setVisible] = useState(false)

    // const {userInfo, loading} = getInfoUser()
    const {user, loading} = useAuth() 
    const {isDarkMode, toggleTheme, lightStyle, darkStyle} = useTheme()
    // const {userInfo, load} = userInfo()

    // console.log("Hola")
    // useEffect(() =>{
    //     async function ver(){
    //         await insertUser(user.uid, userInfo.username, userInfo.email);

    //         const data = await selectUser(user.uid)
    //         console.log("Esto es la data")
    //         console.log(data)
    //     }
    //     ver()
    // },[])
    

    // toggleTheme()
    const themeStyle = isDarkMode ? darkStyle : lightStyle

    // En JSX siempre debe de retornar
    return (
            <View style={[styles.cont, themeStyle.container]}>
                <Stack.Screen
                    options={{
                        headerTintColor: "#ffd",
                        headerTitle: "",
                        headerRight: () => (user ? 
                        <CreateProject 
                            visible={visible} 
                            setVisible={setVisible}
                            /> :
                             <AuthBttns/> )
                    }}
                />
                <Pressable onPress={toggleTheme}>
                    <Text>a ver</Text>
                </Pressable>
                <Text>dsds</Text>
            {user? (
                <>
                    <Text>{user.email}</Text>
                    <RenderProjects />
                </>
            ) : null}   
        </View>
    )
};

const styles = StyleSheet.create({
    pr:{
        fontSize: 50,
        color: "#000"
    },
    cont:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 24
    },
}) 
