import { getMatchData, updateTeleopShuttlingTime, updateDefenseTime } from "../api/data";
import { View, StyleSheet } from "react-native";
import SectionTitle from "../components/SectionTitle";
import { GamePhase } from "../api/data_types";
import UniversalTimer from "../components/UniversalTimer";
import { useEffect, useState } from "react";

function TeleopTimerView() {
    const [shuttleTime, setShuttleTime] = useState(0);
    const [defenseTime, setDefenseTime] = useState(0);
  
    useEffect(() => {
      getMatchData().then((data) => {
        setShuttleTime(data.teleop?.TeleopshuttlingTime ?? 0);
        setDefenseTime(data.teleop?.defenseTime ?? 0);
      });
    }, []);
  
    return (
      <View>
        <SectionTitle>Shuttling</SectionTitle>
        <UniversalTimer
          initialTime={shuttleTime}
          onStop={(t) => updateTeleopShuttlingTime("teleop", t)}
        />
  
        <SectionTitle>Defense</SectionTitle>
        <UniversalTimer
          initialTime={defenseTime}
          onStop={(t) => updateDefenseTime(t)}
        />
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

  export default TeleopTimerView;
  