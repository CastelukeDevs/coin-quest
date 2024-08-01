import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ColorScale, ColorStandard } from "@/constants/Colors";
import GlobalStyles from "@/constants/GlobalStyles";
import Buttons from "./commons/Buttons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Dimens from "@/constants/Dimens";

const ScreenHeader = () => {
  const { top } = useSafeAreaInsets();
  const onBackPressHandler = () => {
    router.back();
  };
  return (
    <View
      style={[GlobalStyles.shadow, { paddingTop: top }, styles.baseContainer]}
    >
      <Buttons
        label="Back"
        onPress={onBackPressHandler}
        styles={{ paddingVertical: 4, paddingHorizontal: 4 }}
      />
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: ColorStandard.white,
    flexDirection: "row",
    padding: Dimens.medium,
    shadowColor: ColorScale.gray[800],
  },
});
