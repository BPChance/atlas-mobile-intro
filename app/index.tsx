import { router } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.headings}>Home Screen</Text>
      <Pressable
        onPress={() => {
          router.push("/add-activity");
        }}
      >
        <Text>Add Activity</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headings: {
    fontSize: 24,
  },
});
