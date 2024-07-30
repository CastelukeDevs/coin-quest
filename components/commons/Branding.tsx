import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ColorScale } from "@/constants/Colors";

const Branding = () => {
  return (
    <View style={{ borderWidth: 0, flexDirection: "row" }}>
      <View>
        <Text style={styles.BrandText}>Coin Quest{"   "}</Text>
        <View style={styles.BrandCircle} />
      </View>
    </View>
  );
};

export default Branding;

const styles = StyleSheet.create({
  BrandText: {
    fontFamily: "ExtraBold",
    fontSize: 24,
    zIndex: 2,
    textAlignVertical: "center",
    // borderWidth: 1,
  },
  BrandCircle: {
    position: "absolute",
    height: 45,
    aspectRatio: 1,
    borderRadius: 45,
    backgroundColor: ColorScale.brand[300],
    top: -5,
    alignSelf: "flex-end",
  },
});
