import { getMatchData, updateAutoShuttlingTime } from "../api/data";
import { View, StyleSheet } from "react-native";
import SectionTitle from "../components/SectionTitle";
import { GamePhase } from "../api/data_types";
import UniversalTimer from "../components/UniversalTimer";
import { useEffect, useState } from "react";

function AutoShuttleTimerView() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    getMatchData().then((data) => {
      setTime(data["autonomous"]?.AutoshuttlingTime ?? 0);
    });
  }, ["autonomous"]);

  return (
    <View style={styles.container}>
      <SectionTitle>Shuttling Timer</SectionTitle>
      <UniversalTimer
        initialTime={time}
        onStop={(finalTime) => {
          updateAutoShuttlingTime("autonomous", finalTime);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
  },
});

export default AutoShuttleTimerView;
