import { View, StyleSheet } from "react-native";
import MathBlock from "../components/MathBlock";
import SectionTitle from "../components/SectionTitle";
import { getMatchData, updateAlgaeScore } from "../api/data";
import { AlgaeLevel, GamePhase } from "../api/data_types";

interface AlgaeViewProps {
    phase: GamePhase;
}

function AlgaeView({ phase }: AlgaeViewProps) {
    const getOldCount = (location: AlgaeLevel) => {
        return getMatchData().then((data) => data[phase]["algae"][location]);
    }

    return (
        <View style={styles.container}>
            <SectionTitle>Algae</SectionTitle>

            <MathBlock min={0} label="Net" onPress={(count: number) => {
                    updateAlgaeScore(phase, "net", count);
                }} oldCount={getOldCount("net")} />
            <MathBlock min={0} label="Processor" onPress={(count: number) => {
                    updateAlgaeScore(phase, "processor", count);
                }} oldCount={getOldCount("processor")} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10
    }
});

export default AlgaeView;
