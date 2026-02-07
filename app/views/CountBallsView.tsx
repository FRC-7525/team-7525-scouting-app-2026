import { View, StyleSheet } from "react-native";
import MathBlock from "../components/MathBlock";
import SectionTitle from "../components/SectionTitle";
import { getMatchData, updateBallCount } from "../api/data";
import { GamePhase } from "../api/data_types";

interface CountBallsViewProps {
    phase: GamePhase;
}

function CountBallsView({ phase }: CountBallsViewProps) {
    const getOldCount = async () => {
        const data = await getMatchData();
        return data[phase].ballCount;
    };

    return (
        <View style={styles.container}>
            <SectionTitle>Fuel count</SectionTitle>
            <MathBlock step={10} label="10 Fuel" min={0} oldCount={getOldCount()} onPress={(count) => updateBallCount(phase, count)} />
            <MathBlock step={1} label="1 Fuel" min={0} oldCount={getOldCount()} onPress={(count) => updateBallCount(phase, count)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        gap: 8,
    },
});

export default CountBallsView;
