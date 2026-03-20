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
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const loadInitial = async () => {
            setIsLoaded(false);
            const data = await getMatchData();
            const total = data[phase]?.ballCount ?? 0;

            if (isMounted) {
                setTensCount(Math.floor(total / 10) * 10);
                setOnesCount(total % 10);
                setIsLoaded(true);
            }
        };

        loadInitial();
        return () => { isMounted = false; };
    }, [phase]);

    useEffect(() => {
        if (!isLoaded) return;

        const total = tensCount + onesCount;
        updateBallCount(phase, total);
    }, [tensCount, onesCount, phase, isLoaded]);

    return (
        <View style={styles.container}>
            <SectionTitle>Fuel count</SectionTitle>

            <MathBlock step={10} label="10 Fuel" min={0} count={tensCount} onPress={setTensCount} />
            <MathBlock step={1} label="1 Fuel" min={0} count={onesCount} onPress={setOnesCount} />
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