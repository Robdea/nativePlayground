import { Stack } from "expo-router";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import ProjectsContext from "../src/context/ProjectsContext";
import ThemeProvider from "../src/context/ThemeProvider";
import { useNetInfo } from "@react-native-community/netinfo";

export default function Layout (){
    const netInfo = useNetInfo()

    console.log("Hay internet?",netInfo.isInternetReachable)

    // useEffect(()=>{  
    //     async function invokeBd(){
    //         const db = await initDatabase() 
    //         console.log(db)
    //     }

    //     invokeBd();
    // },[])    



    return(
        <ProjectsContext>
            <View style={styles.cont}>
                <StatusBar barStyle="light" />
                <ThemeProvider>
                    <Stack >
                        <Stack.Screen 
                            name="(tabs)" 
                            options={{ headerShown: false }} 
                        />
                    </Stack>
                </ThemeProvider>
            </View>
        </ProjectsContext>
        
    );
}

const styles = StyleSheet.create({
    pr:{
        fontSize: 50,
        color: "#000"
    },
    cont:{
        flex: 1,
    }
}) 
