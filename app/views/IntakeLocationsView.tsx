import { useEffect, useState } from "react";
import { getMatchData, updateIntakeTag, updateCrossLineTag } from "../api/data";
import { View, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";
import SectionTitle from "../components/SectionTitle";
import Checkbox from "../components/Checkbox";
import { MatchData, OffenseRobotData, RobotSlot } from "../api/data_types";

interface IntakeLocationsViewProps {
    slot: RobotSlot;
}

function IntakeLocationsView({ slot }: IntakeLocationsViewProps) {
    const [centerZoneChecked, setCenterZoneChecked] = useState(false);

    useEffect(() => {
        getMatchData().then((data) => {
            const robot = data[slot];
            if ((robot as OffenseRobotData).type === "offense") {
                setCenterZoneChecked((robot as OffenseRobotData).intakeTags.includes("Center zone"));
            }
        });
    }, [slot]);

    return (
        <View style={styles.container}>
            <SectionTitle>Intook From:</SectionTitle>
            <Checkbox
                label="Outpost"
                getChecked={(data: MatchData) => (data[slot] as OffenseRobotData).intakeTags.includes("Outpost")}
                update={(remove: boolean) => updateIntakeTag(slot, "Outpost", remove)} />
            <Checkbox
                label="Depot"
                getChecked={(data: MatchData) => (data[slot] as OffenseRobotData).intakeTags.includes("Depot")}
                update={(remove: boolean) => updateIntakeTag(slot, "Depot", remove)} />
            <Checkbox
                label="Center Zone"
                getChecked={(data: MatchData) => (data[slot] as OffenseRobotData).intakeTags.includes("Center zone")}
                update={(remove: boolean) => {
                    setCenterZoneChecked(!remove);
                    if (!remove) {
                        return updateIntakeTag(slot, "Center zone", remove);
                    } else {
                        return Promise.all([
                            updateIntakeTag(slot, "Center zone", remove),
                            updateCrossLineTag(slot, "BUMP", true),
                            updateCrossLineTag(slot, "TRENCH", true),
                        ]).then(() => undefined);
                    }
                }} />

            {centerZoneChecked && (<>
                <Divider style={{ marginVertical: 8 }} />
                <SectionTitle>Reached Center Zone Via:</SectionTitle>
                <Checkbox
                    label="BUMP"
                    getChecked={(data: MatchData) => (data[slot] as OffenseRobotData).crossLineTags.includes("BUMP")}
                    update={(remove: boolean) => updateCrossLineTag(slot, "BUMP", remove)} />
                <Checkbox
                    label="TRENCH"
                    getChecked={(data: MatchData) => (data[slot] as OffenseRobotData).crossLineTags.includes("TRENCH")}
                    update={(remove: boolean) => updateCrossLineTag(slot, "TRENCH", remove)} />
            </>)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 10,
    },
});

export default IntakeLocationsView;