import SliderNative from "@react-native-community/slider";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface SliderProps {
  min: number;
  max: number;
  step: number;
  onValueChange: (value: number) => void;
  oldValue: Promise<number>;
  label?: string;
}

export default function Slider({
  min,
  max,
  step,
  onValueChange,
  oldValue
}: SliderProps) {
  const [displayValue, setDisplayValue] = useState(min);
  const [initialValue, setInitialValue] = useState<number | null>(null);

  useEffect(() => {
    oldValue.then(v => {
      if (typeof v === "number") {
        setDisplayValue(v);
        setInitialValue(v);
      }
    });
  }, [oldValue]);

  if (initialValue === null) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.value}>{displayValue}</Text>
      <SliderNative
        key={`slider-${initialValue}`}
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={initialValue}
        onValueChange={(v) => {
          setDisplayValue(v);
        }}
        onSlidingComplete={(v) => {
          onValueChange(v);
        }}
        minimumTrackTintColor="#d9a1ff"
        maximumTrackTintColor="#5f3274"
        thumbTintColor="#000000"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  value: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "500",
    alignSelf: "flex-end",
    marginBottom: 6,
  }
});
