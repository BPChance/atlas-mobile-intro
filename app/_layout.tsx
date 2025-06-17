import { Stack } from "expo-router";
import { setupDatabase } from "../utils/database";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    setupDatabase();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="add-activity" options={{ headerShown: false }} />
    </Stack>
  );
}
