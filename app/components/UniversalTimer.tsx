import { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

interface UniversalTimerProps {
  initialTime?: number;
  onStop?: (finalTime: number) => void;
  tickMs?: number;
}

function UniversalTimer({
  initialTime = 0,
  onStop,
  tickMs = 10,
}: UniversalTimerProps) {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setTime(initialTime);
  }, [initialTime]);

  const startStop = () => {
    if (isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsRunning(false);
      onStop?.(time);
    } else {
      intervalRef.current = setInterval(() => {
        setTime((t) => t + tickMs);
      }, tickMs);
      setIsRunning(true);
    }
  };

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTime(0);
    setIsRunning(false);
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
        <Button mode="contained" onPress={startStop}>
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
