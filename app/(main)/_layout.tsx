import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { useAppDispatch } from "@/redux/store";
import {
  getAllCoin,
  resetCoinList,
  selectCoinListIsEmpty,
} from "@/redux/reducers/coinReducer";
import { useSelector } from "react-redux";
import { CCWSURL } from "@/constants/String";
import { useWebSocket } from "@/provider/SocketProvider";

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const coinListEmpty = useSelector(selectCoinListIsEmpty);
  const { socket, subscribe, init } = useWebSocket();

  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
    init();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
      <Stack.Screen name="DetailsScreen" options={{ headerShown: false }} />
    </Stack>
  );
};

export default MainLayout;
