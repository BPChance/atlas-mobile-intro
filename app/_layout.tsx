import { Stack } from "expo-router";
import { setupDatabase } from "../utils/database";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  useEffect(() => {
    setupDatabase();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="add-activity" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
