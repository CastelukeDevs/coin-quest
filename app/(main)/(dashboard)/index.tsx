import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ColorScale } from "@/constants/Colors";
import Branding from "@/components/commons/Branding";
import Dimens from "@/constants/Dimens";
import Buttons from "@/components/commons/Buttons";
import GlobalStyles from "@/constants/GlobalStyles";

const index = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View
      style={{ padding: Dimens.large, paddingTop: top + Dimens.large, flex: 1 }}
    >
      <Branding />
      <View style={{ flex: 1, marginTop: Dimens.medium }}>
        <Text style={GlobalStyles.text_section_header}>Your Watchlist</Text>
      </View>
      <View style={{ height: 100 }}>
        <Buttons label="Sign In" />
        <Text style={[GlobalStyles.text_content_sub, styles.footerText]}>
          Sign in to gain access into details, ranking and bookmarks.
        </Text>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  footerText: {
    paddingHorizontal: 50,
    textAlign: "center",
    marginTop: Dimens.small,
    // color: ColorScale.gray[600],
  },
});
