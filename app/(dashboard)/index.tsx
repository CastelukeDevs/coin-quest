import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ColorScale } from "@/constants/Colors";
import Branding from "@/components/commons/Branding";
import Dimens from "@/constants/Dimens";
import Buttons from "@/components/commons/Buttons";

const index = () => {
  const test = process.env.EXPO_PUBLIC_CRYPTO_COMPARE_API_KEY;
  console.log("test env", test);

  const { top } = useSafeAreaInsets();
  return (
    <View style={{ padding: Dimens.large, paddingTop: top + Dimens.large }}>
      <Branding />
      <View style={{ flex: 1 }}></View>
      <View style={{ height: 100 }}>
        <Buttons label="Sign In" />
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
