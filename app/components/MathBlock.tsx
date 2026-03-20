import { StyleSheet, Text, View } from "react-native";
import MathButton from "./MathButton";
import { Chip } from "react-native-paper";

interface MathBlockProps {
    min?: number;
    max?: number;
    step: number;
    label?: string;
    showNumber?: boolean;
    onPress: (count: number) => void;
    count: number;
}

function MathBlock({ min, max, step, label, showNumber = true, onPress, count }: MathBlockProps) {
    const displayLabel = label !== undefined ? label + " " : "";

    return (
        <View style={styles.container}>
            <MathButton operation="-" count={count} step={step} setCount={onPress} min={min} />
            <Text style={styles.text}>{displayLabel}</Text>
            {showNumber && <Chip style={styles.chip}>{count}</Chip>}
            <MathButton operation="+" count={count} step={step} setCount={onPress} max={max} />
        </View>
    );
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
        textAlign: "center"
    },
    chip: {}
});

export default MathBlock;