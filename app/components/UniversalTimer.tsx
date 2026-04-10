import { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

interface UniversalTimerProps {
  initialTime?: number;
  onStop?: (finalTime: number) => void;
  tickMs?: number;
  isRunning: boolean;
  setIsRunning: (running: boolean) => void;
}

function UniversalTimer({
  initialTime = 0,
  onStop,
  tickMs = 10,
  isRunning,
  setIsRunning,
}: UniversalTimerProps) {
  const [time, setTime] = useState(initialTime);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setTime(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((t) => t + tickMs);
      }, tickMs);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      onStop?.(time);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  const reset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:${milliseconds.toString().padStart(3, "0")}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{formatTime(time)}</Text>
      <View style={styles.buttons}>
        <Button mode="contained" onPress={() => setIsRunning(!isRunning)}>
          {isRunning ? "Stop" : "Start"}
        </Button>
        <Button mode="outlined" onPress={reset}>
          Reset
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  time: {
    fontSize: 15,
    marginBottom: 10,
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
  },
});

export default UniversalTimer;