import { getMatchData, updateTeleopShuttlingTime, updateDefenseTime } from "../api/data";
import { View, StyleSheet } from "react-native";
import SectionTitle from "../components/SectionTitle";
import UniversalTimer from "../components/UniversalTimer";
import { useEffect, useState } from "react";

interface TeleopTimerViewProps {
    shuttleRunning: boolean;
    setShuttleRunning: (val: boolean) => void;
    defenseRunning: boolean;
    setDefenseRunning: (val: boolean) => void;
}

function TeleopTimerView({ 
    shuttleRunning, 
    setShuttleRunning, 
    defenseRunning, 
    setDefenseRunning 
}: TeleopTimerViewProps) {
    const [shuttleTime, setShuttleTime] = useState(0);
    const [defenseTime, setDefenseTime] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const loadInitialData = async () => {
            const data = await getMatchData();
            if (isMounted) {
                setShuttleTime(data.teleop?.TeleopshuttlingTime ?? 0);
                setDefenseTime(data.teleop?.defenseTime ?? 0);
                setIsLoaded(true);
            }
        };

        loadInitialData();
        return () => { isMounted = false; };
    }, []);

    if (!isLoaded) return null;

    return (
        <View style={styles.container}>
            <SectionTitle>Shuttling</SectionTitle>
            <UniversalTimer
                initialTime={shuttleTime}
                isRunning={shuttleRunning}
                setIsRunning={setShuttleRunning}
                onStop={(t) => updateTeleopShuttlingTime("teleop", t)}
            />

            <SectionTitle>Defense</SectionTitle>
            <UniversalTimer
                initialTime={defenseTime}
                isRunning={defenseRunning}
                setIsRunning={setDefenseRunning}
                onStop={(t) => updateDefenseTime(t)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10
    }
});

export default TeleopTimerView;