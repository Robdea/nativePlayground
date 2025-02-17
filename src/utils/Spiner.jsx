import { ActivityIndicator, View } from "react-native";

export default function Spiner({size, color}) {
    return(
        <View >
            <ActivityIndicator size={size} color={color} />
        </View>
    )
};
