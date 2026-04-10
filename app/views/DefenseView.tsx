import { View, StyleSheet } from "react-native";
import SectionTitle from "../components/SectionTitle";
import Slider from "../components/Slider";
import { getMatchData, updateDefenseCitrusScale, updateRobotWeight } from "../api/data";
import { DefenseRobotData, RobotSlot } from "../api/data_types";

type Props = {
    slot: RobotSlot;
};

function DefenseView({ slot }: Props) {
    return (
        <View style={styles.container}>
            <SectionTitle>Defense Rating (1=best)</SectionTitle>
            <Slider
                min={1} max={3} step={1}
                onValueChange={(val) => updateDefenseCitrusScale(slot, val)}
                oldValue={getMatchData().then((data) => (data[slot] as DefenseRobotData).defenseCitrusScale)} />
            <SectionTitle>Weight Rating (1=hardest to push around)</SectionTitle>
            <Slider
                min={1} max={3} step={1}
                onValueChange={(val) => updateRobotWeight(slot, val)}
                oldValue={getMatchData().then((data) => (data[slot] as DefenseRobotData).robotWeight)} />
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

export default DefenseView;