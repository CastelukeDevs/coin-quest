import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ColorStandard } from "@/constants/Colors";
import Branding from "@/components/commons/Branding";
import Analyze from "@/components/Illustration/Analyze";
import Dimens from "@/constants/Dimens";
import Buttons from "@/components/commons/Buttons";

const Index = () => {
  const { top, bottom } = useSafeAreaInsets();
  const navigateToHome = () => {
    router.replace("(main)/(dashboard)/HomeScreen");
  };

  return (
    <View
      style={{
        paddingTop: top,
        paddingBottom: bottom,
        backgroundColor: ColorStandard.white,
        flex: 1,
        paddingHorizontal: Dimens.xLarge,
      }}
    >
      <View>
        <Branding />
      </View>
      <View style={{ flex: 1, justifyContent: "space-evenly" }}>
        <Analyze style={{ height: 400, alignSelf: "center" }} />
        <Text style={{ fontFamily: "Bold", fontSize: 32 }}>
          Your Journey to Smart Crypto Tracking, Empowering Your Crypto Quest
        </Text>
      </View>
      <View style={{ marginBottom: Dimens.xLarge }}>
        <Buttons label="Let's Go" onPress={navigateToHome} />
      </View>
    </View>
  );
};

export default Index;
