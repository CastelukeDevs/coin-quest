import { useEffect } from "react";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { useFonts } from "expo-font";
import * as PlusJakartaSans from "@expo-google-fonts/plus-jakarta-sans";

import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ExtraLight: PlusJakartaSans.PlusJakartaSans_200ExtraLight,
    Light: PlusJakartaSans.PlusJakartaSans_300Light,
    Regular: PlusJakartaSans.PlusJakartaSans_400Regular,
    Medium: PlusJakartaSans.PlusJakartaSans_500Medium,
    SemiBold: PlusJakartaSans.PlusJakartaSans_600SemiBold,
    Bold: PlusJakartaSans.PlusJakartaSans_700Bold,
    ExtraBold: PlusJakartaSans.PlusJakartaSans_800ExtraBold,
    ExtraLight_Italic: PlusJakartaSans.PlusJakartaSans_200ExtraLight_Italic,
    Light_Italic: PlusJakartaSans.PlusJakartaSans_300Light_Italic,
    Regular_Italic: PlusJakartaSans.PlusJakartaSans_400Regular_Italic,
    Medium_Italic: PlusJakartaSans.PlusJakartaSans_500Medium_Italic,
    SemiBold_Italic: PlusJakartaSans.PlusJakartaSans_600SemiBold_Italic,
    Bold_Italic: PlusJakartaSans.PlusJakartaSans_700Bold_Italic,
    ExtraBold_Italic: PlusJakartaSans.PlusJakartaSans_800ExtraBold_Italic,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
