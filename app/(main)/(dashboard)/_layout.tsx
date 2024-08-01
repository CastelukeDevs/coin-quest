import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { ColorScale } from "@/constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: ColorScale.gray[800],
        tabBarInactiveTintColor: ColorScale.gray[400],
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIconStyle: {
          justifyContent: "center",
          marginTop: 14,
        },
      }}
    >
      <Tabs.Screen
        name="HomeScreen"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={"home-outline"} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="RankingScreen"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={"rocket-outline"}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={"id-card-outline"}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
