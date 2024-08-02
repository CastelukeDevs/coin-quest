import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ColorScale } from "@/constants/Colors";

type IBrandingProps = {
  size?: number;
};
const Branding = ({ size = 45 }: IBrandingProps) => {
  return (
    <View style={{ flexDirection: "row", height: size }}>
      <View style={{ justifyContent: "center" }}>
        <Text
          style={[
            styles.BrandText,
            { fontSize: size / 2, paddingEnd: size / 2 },
          ]}
        >
          Coin Quest
        </Text>
        <View style={[styles.BrandCircle, { height: size }]} />
      </View>
    </View>
  );
};

export default Branding;

const styles = StyleSheet.create({
  BrandText: {
    fontFamily: "ExtraBold",
    zIndex: 2,
    textAlignVertical: "center",
  },
  BrandCircle: {
    position: "absolute",
    aspectRatio: 1,
    borderRadius: 45,
    backgroundColor: ColorScale.brand[300],
    top: 0,
    alignSelf: "flex-end",
  },
});
