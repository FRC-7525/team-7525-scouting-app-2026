import { View, StyleSheet } from "react-native";
import MathBlock from "../components/MathBlock";
import SectionTitle from "../components/SectionTitle";
import { getMatchData, updateBallCount } from "../api/data";
import { GamePhase } from "../api/data_types";

interface countBallsViewProps {
    phase: GamePhase;
}

function CountBallsView({ phase }: countBallsViewProps) {
    const getOldCount = async () => {
        const data = await getMatchData();
        return data[phase].ballCount;
    };

    return (
        <View style={styles.container}>
            <SectionTitle>Algae</SectionTitle>

            <View style={styles.grid}>
                <MathBlock step={10} label="10 Fuel" min={0} oldCount={getOldCount()} onPress={(count: number) => updateBallCount(phase, count)}/>
                <MathBlock step={10} label="10 Fuel" min={0} oldCount={getOldCount()} onPress={(count: number) => updateBallCount(phase, count)}/>
                <MathBlock step={5} label="5 Fuel" min={0} oldCount={getOldCount()} onPress={(count: number) => updateBallCount(phase, count)}/>
                <MathBlock step={5} label="5 Fuel" min={0} oldCount={getOldCount()} onPress={(count: number) => updateBallCount(phase, count)}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap"
    }
});

export default CountBallsView;
