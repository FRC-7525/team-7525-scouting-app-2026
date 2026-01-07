import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import { addUnsyncedData, deleteMatchData, getMatchData } from "./api/data";
import { View } from "react-native";
import { router } from "expo-router";

export default function App() {
    const [ animating, setAnimating ] = useState(true);

    useEffect(() => {
        getMatchData()
            .then(addUnsyncedData)
            .then(deleteMatchData)
            .then(() => {
                setAnimating(false);
                router.push("");
            });
    }, []);

    return (
        <View style={{justifyContent: "center", flex: 1}}>
            <ActivityIndicator size="large" animating={animating} />
        </View>
    )
}