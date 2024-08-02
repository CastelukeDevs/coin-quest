// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import { ColorScale } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";
import { View } from "react-native";

export function TabBarIcon({
  style,
  focused,
  ...rest
}: { focused: boolean } & IconProps<ComponentProps<typeof Ionicons>["name"]>) {
  return (
    <View
      style={{
        height: 50,
        aspectRatio: 1,
        borderRadius: 100,
        backgroundColor: !focused ? "transparent" : ColorScale.brand[50],
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          height: 45,
          aspectRatio: 1,
          borderRadius: 100,
          backgroundColor: !focused ? "transparent" : ColorScale.brand[100],
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            height: 40,
            aspectRatio: 1,
            borderRadius: 100,
            backgroundColor: !focused ? "transparent" : ColorScale.brand[200],
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              height: 35,
              aspectRatio: 1,
              borderRadius: 100,
              backgroundColor: !focused ? "transparent" : ColorScale.brand[300],
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons
              size={28}
              style={[{ marginBottom: -3 }, style]}
              {...rest}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
