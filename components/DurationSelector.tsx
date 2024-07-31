import { ColorScale } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";
import Buttons from "./commons/Buttons";
import { useState } from "react";

const durationList = [
  { label: "1d", day: 1 },
  { label: "1w", day: 7 },
  { label: "2w", day: 14 },
  { label: "1m", day: 30 },
  { label: "3m", day: 90 },
  { label: "6m", day: 180 },
  { label: "1y", day: 365 },
];

type IDurationSelectorProps = {
  value?: number;
  onChangeSelected?: (v: number) => void;
};
const DurationSelector = (props: IDurationSelectorProps) => {
  const [selected, setSelected] = useState(props.value ?? 1);

  const onItemSelected = (day: number) => {
    setSelected(day);
    props.onChangeSelected?.(day);
  };
  return (
    <View style={styles.selectorContainer}>
      {durationList.map((item) => {
        return (
          <View key={item.label} style={{ flex: 1 }}>
            <Buttons
              label={item.label}
              value={item.day}
              onPress={onItemSelected}
              mode={selected === item.day ? "contained" : "faded"}
              styles={{ paddingHorizontal: 6, paddingVertical: 6 }}
            />
          </View>
        );
      })}
    </View>
  );
};
export default DurationSelector;

const styles = StyleSheet.create({
  selectorContainer: {
    flexDirection: "row",
    backgroundColor: ColorScale.brand[50],
    padding: 12,
  },
});
