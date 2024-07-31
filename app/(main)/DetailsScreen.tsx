import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const DetailsScreen = () => {
  const { item } = useLocalSearchParams();
  const parsed = JSON.parse(item as string);
  console.log("params", parsed);

  return (
    <View>
      <Text>DetailsScreen</Text>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({});
