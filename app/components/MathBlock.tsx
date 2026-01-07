import { StyleSheet, Text, View } from "react-native";
import MathButton from "./MathButton";
import { useEffect, useState } from "react";
import { Chip } from "react-native-paper";

interface MathBlockProps {
    min?: number;
    max?: number;
    label?: string;
    showNumber?: boolean;
    onPress?: (count: number) => void;
    oldCount?: Promise<number>;
};

function MathBlock({ min, max, label, showNumber, onPress, oldCount }: MathBlockProps) {
    label = (label !== undefined) ? label + " " : "";
    onPress ??= () => {};
    showNumber ??= true;
    const [ count, setCount ] = useState(0);

    useEffect(() => {
        const getOldCount = async () => {
            setCount(await oldCount ?? 0);
        }

        getOldCount();
    }, []);

    const mathButtonOnPress = (newCount: number) => {
        setCount(newCount)
        onPress(newCount);
    }

    return (
        <View style={styles.container}>
            <MathButton operation="-" count={count} setCount={mathButtonOnPress} min={min} />
            <Text style={styles.text}>{ label }</Text>
            { showNumber && <Chip style={styles.chip}>{count}</Chip> }
            <MathButton operation="+" count={count} setCount={mathButtonOnPress} max={max} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 4,
        flexDirection: "row",
        alignItems: "center",
        columnGap: 10
    },
    text: {
        flex: 3,
        textAlign: "center",
    },
    chip: {
    }
})

export default MathBlock;