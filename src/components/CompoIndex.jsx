import { Link } from "expo-router"
import { View, Text, Pressable, StyleSheet } from "react-native"
import Svg, { Path } from 'react-native-svg';

import ModalCreateProject from "../utils/modals/ModalCreateProject"
import { useTheme } from "../context/ThemeProvider"


export function AuthBttns() {
     
    const {isDarkMode, lightStyle, darkStyle} = useTheme()

    const themeStyle = isDarkMode ? darkStyle : lightStyle


    return(
        <View style={styles.containerBttns}>
            <Link asChild href={"/auth/register"}>
                <Pressable >
                    <Svg width="30" color={"#000"} height="30" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                        <Path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                    </Svg>
                </Pressable>
            </Link>
        </View>
    )
};

{/* <Link asChild href={"/auth/login"}>
                <Pressable style={themeStyle.buttons}>
                    <Text style={themeStyle.bttnText}>Iniciar sesión</Text>
                </Pressable>
            </Link> */}

export const CreateProject= ({visible, setVisible}) =>{

    return(
        <View>
            <Pressable onPress={() => setVisible(true)}>
                    <Svg width="30" color={"#000"} height="30" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <Path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </Svg>
            </Pressable>
        
            <ModalCreateProject 
                modalVisible={visible} 
                setModalVisible={setVisible} 
            />


        </View>
    )
}

const styles = StyleSheet.create({
    containerBttns:{
        flexDirection: "row",
        gap: 18
    }
})