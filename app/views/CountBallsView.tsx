import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import MathBlock from "../components/MathBlock";
import SectionTitle from "../components/SectionTitle";
import { getMatchData, updateBallCount } from "../api/data";
import { GamePhase } from "../api/data_types";

interface CountBallsViewProps {
    phase: GamePhase;
}

function CountBallsView({ phase }: CountBallsViewProps) {
    const [tensCount, setTensCount] = useState(0);
    const [onesCount, setOnesCount] = useState(0);

    useEffect(() => {
        const loadInitial = async () => {
            const data = await getMatchData();
            const total = data[phase].ballCount ?? 0;

            setTensCount(Math.floor(total / 10) * 10);
            setOnesCount(total % 10);
        };

        loadInitial();
    }, [phase]);

    useEffect(() => {
        const total = tensCount + onesCount;
        updateBallCount(phase, total);
    }, [tensCount, onesCount, phase]);

    return (
        <View style={styles.container}>
            <SectionTitle>Fuel count</SectionTitle>

            <MathBlock step={10} label="10 Fuel" min={0} oldCount={Promise.resolve(tensCount)} onPress={setTensCount} />
            <MathBlock step={1} label="1 Fuel" min={0} oldCount={Promise.resolve(onesCount)} onPress={setOnesCount} />
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
