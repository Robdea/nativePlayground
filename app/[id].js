import { useSearchParams } from "expo-router/build/hooks"
import { View, Text } from "react-native"
import EditorView from "../src/EditorView.jsx"
import { Stack } from "expo-router"


export default function RenderUICoder() {
    const [data] = useSearchParams();

    const [key, uid] =data 

    const [id, name] = uid.split("-")

    console.log(id)
    console.log(name)

    return(
        <View >
            <Stack.Screen
                options={{
                    title: name,
                }}
            />
            <EditorView
                id={id}
            />
        </View>
    )
};

