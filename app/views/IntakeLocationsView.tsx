import { useEffect, useState } from "react";
import { getMatchData, updateIntakeLocationTag, updateCrossLineTag } from "../api/data";
import { View, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";
import SectionTitle from "../components/SectionTitle";
import Checkbox from "../components/Checkbox";
import { MatchData, GamePhase } from "../api/data_types";

interface IntakeLocationsViewProps {
  phase: GamePhase;
}

function IntakeLocationsView({ phase }: IntakeLocationsViewProps) {
  const [centerZoneChecked, setCenterZoneChecked] = useState(false);

  useEffect(() => {
    const loadInitial = async () => {
      const data = await getMatchData();
      setCenterZoneChecked(data[phase].intakeTags.includes("Center zone"));
    };
    loadInitial();
  }, [phase]);

  return (
    <View style={styles.container}>
      <SectionTitle>Intook From:</SectionTitle>
      <Checkbox label="Outpost" getChecked={(data: MatchData) => data[phase].intakeTags.includes("Outpost")} update={(remove: boolean) => updateIntakeLocationTag("Outpost", remove, phase)} />
      <Checkbox label="Depot" getChecked={(data: MatchData) => data[phase].intakeTags.includes("Depot")} update={(remove: boolean) => updateIntakeLocationTag("Depot", remove, phase)} />
      <Checkbox label="Center Zone" getChecked={(data: MatchData) => data[phase].intakeTags.includes("Center zone")} update={(remove: boolean) => {
          const newState = !remove;
          setCenterZoneChecked(newState);

          if (!newState) {
            return Promise.all([
              updateIntakeLocationTag("Center zone", remove, phase),
              updateCrossLineTag("BUMP", true, phase),
              updateCrossLineTag("TRENCH", true, phase),
            ]).then(() => undefined);
          } else {
            return updateIntakeLocationTag("Center zone", remove, phase);
          }
        }}
      />

      {centerZoneChecked && (
        <>
          <Divider style={{ marginVertical: 8 }} />
          <SectionTitle>Reached Center Zone Via:</SectionTitle>
          <Checkbox label="BUMP" getChecked={(data: MatchData) => data[phase].crossLineTags.includes("BUMP")} update={(remove: boolean) => updateCrossLineTag("BUMP", remove, phase)} />
          <Checkbox label="TRENCH" getChecked={(data: MatchData) => data[phase].crossLineTags.includes("TRENCH")} update={(remove: boolean) => updateCrossLineTag("TRENCH", remove, phase)} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
  },
});

export default IntakeLocationsView;