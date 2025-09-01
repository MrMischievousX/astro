import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import "@/utils/i18n";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    "Recoleta-Thin": require("../assets/fonts/recoleta-thin.otf"),
    "Recoleta-Light": require("../assets/fonts/recoleta-light.otf"),
    "Recoleta-Regular": require("../assets/fonts/recoleta-regular.otf"),
    "Recoleta-Medium": require("../assets/fonts/recoleta-medium.otf"),
    "Recoleta-SemiBold": require("../assets/fonts/recoleta-semibold.otf"),
    "Recoleta-Bold": require("../assets/fonts/recoleta-bold.otf"),
    "Recoleta-Black": require("../assets/fonts/recoleta-black.otf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={styles.container}>
        <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
          <Stack.Screen name='index' />
          <Stack.Screen name='journalscreen' />
          <Stack.Screen name='historyscreen' />
          <Stack.Screen name='+not-found' />
        </Stack>
        <StatusBar style='light' />
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
