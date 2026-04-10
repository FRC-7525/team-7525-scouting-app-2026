import { View, StyleSheet } from "react-native";
import SectionTitle from "../components/SectionTitle";
import Slider from "../components/Slider";
import { getMatchData, updateDriverCitrusScale } from "../api/data";
import { RobotSlot } from "../api/data_types";

type Props = {
    slot: RobotSlot;
};

function SuperScoutView({ slot }: Props) {
    return (
        <View style={styles.container}>
            <SectionTitle>Driver Rating (1=best)</SectionTitle>
            <Slider min={1} max={3} step={1} onValueChange={(val) => updateDriverCitrusScale(slot, val)} oldValue={getMatchData().then((data) => data[slot].driverCitrusScale)} />
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

export default SuperScoutView;