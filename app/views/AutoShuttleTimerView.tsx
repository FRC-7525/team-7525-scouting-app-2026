import { getMatchData, updateAutoShuttlingTime } from "../api/data";
import { View, StyleSheet } from "react-native";
import SectionTitle from "../components/SectionTitle";
import UniversalTimer from "../components/UniversalTimer";
import { useEffect, useState } from "react";

interface AutoShuttleTimerViewProps {
  isRunning: boolean;
  setIsRunning: (running: boolean) => void;
}

function AutoShuttleTimerView({ isRunning, setIsRunning }: AutoShuttleTimerViewProps) {
  const [initialTime, setInitialTime] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      const data = await getMatchData();
      const savedTime = data["autonomous"]?.AutoshuttlingTime ?? 0;
      
      if (isMounted) {
        setInitialTime(savedTime);
        setIsLoaded(true);
      }
    };
    loadData();
    return () => { isMounted = false; };
  }, []);

  return (
    <View style={styles.container}>
      <SectionTitle>Shuttling Timer</SectionTitle>
      {isLoaded && (
        <UniversalTimer
          initialTime={initialTime}
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          onStop={(finalTime) => {
            updateAutoShuttlingTime("autonomous", finalTime);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
  },
});

export default AutoShuttleTimerView;