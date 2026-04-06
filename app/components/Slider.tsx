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
  const [value, setValue] = useState(min);

  useEffect(() => {
    oldValue.then(v => {
      if (typeof v === "number") setValue(v);
    });
  }, [oldValue]);

  return (
    <View style={styles.container}>
      <Text style={styles.value}>{value}</Text>
      <SliderNative
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={value} 
        onValueChange={(v: number) => {
          setValue(v);
        }}
        onSlidingComplete={(v: number) => {
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
    rowGap: 6,
  },
  value: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
    alignSelf: "flex-end",

  }
});
