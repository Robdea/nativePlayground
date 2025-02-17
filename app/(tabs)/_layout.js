import { Tabs } from "expo-router";
import {getInfoUser, useAuth} from "../../src/database/firebaseAction";
import { Text } from "react-native";
import { useTheme } from "../../src/context/ThemeProvider";
import { Administration, FileIcon, UserIcon } from "../../assets/icons/Icons";


export default function TabsLayout() {
    const {user, loading} = useAuth()
    // const {userInfo, loading} = getInfoUser()

    const {isDarkMode, lightStyle, darkStyle} = useTheme()

    const themeStyle = isDarkMode ? darkStyle : lightStyle

    return (
    <Tabs
        screenOptions={{
            headerShown: true,
            headerStyle:{
                backgroundColor: "#fff",
                borderBottomWidth:2,
                borderBottomColor: "rgba(0,0,0,0.25)",
                borderStyle: "solid"
            },
            headerLeftContainerStyle:{
                padding:20,
            },
            headerRightContainerStyle:{
                padding: 20,
            },
            headerLeft: () => (<Text style={themeStyle.importantText}>PlaygroundWeb</Text>),

        }}

        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Proyectos",
                    tabBarIcon: (({color}) => <FileIcon/>),
                }}
            />

            <Tabs.Screen
                name="ManamegtPro"
                options={{
                    title: "Gestionar proyectos",
                    href: user ? undefined : null, 
                    headerTitle:"",
                    tabBarIcon: (() => <Administration/>)
                }}
            />

            <Tabs.Screen
                name="userProfile"
                options={{
                    title: "Usuario",
                    href: user ? undefined : null, 
                    headerTitle:"",
                    tabBarIcon: (() => <UserIcon/>)
                }}
            />
    </Tabs>
    )
};
