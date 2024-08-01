import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";

const index = () => {
  const navigateToHome = () => {
    router.replace("(main)/(dashboard)/HomeScreen");
  };
  useEffect(() => {
    setTimeout(() => {
      navigateToHome();
    }, 1000);
    return () => {};
  }, []);

  return (
    <View>
      <Text>index</Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
