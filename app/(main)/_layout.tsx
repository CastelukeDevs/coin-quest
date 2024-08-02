import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { useWebSocket } from "@/provider/SocketProvider";

const MainLayout = () => {
  const { init } = useWebSocket();

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
