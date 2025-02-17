import { Pressable, Text } from "react-native";

export default function ButtonChange({nameBttn, setState, stylePather}) {
    return(
        <Pressable 
        style={stylePather}
        onPress={() => setState(nameBttn)}
        >
            <Text>{nameBttn}</Text>
        </Pressable>
    )
};
