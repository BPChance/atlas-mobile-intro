import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { fetchActivities } from "@/utils/database";
import { FlashList } from "@shopify/flash-list";

type Activity = {
  id: number;
  steps: number;
  date: number;
};

export default function Index() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    loadActivities();
  }, []);

  // helper function to update activities state
  async function loadActivities() {
    const data = await fetchActivities();
    setActivities(data);
  }

  function formatDate(unix: number) {
    const date = new Date(unix * 1000);
    return date.toLocaleString();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Home Screen</Text>
      <View style={styles.listContainer}>
        <FlashList
          data={activities}
          keyExtractor={(item) => item.id.toString()}
          estimatedItemSize={50}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardDate}>{formatDate(item.date)}</Text>
              <Text style={styles.cardSteps}>
                Steps: {item.steps.toLocaleString()}
              </Text>
            </View>
          )}
          ListEmptyComponent={<Text>No entries yet</Text>}
        />
      </View>
      <Pressable
        style={styles.button}
        onPress={() => {
          router.push("/add-activity");
        }}
      >
        <Text style={styles.buttonText}>Add Activity</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: "#FEF9E6",
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  item: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    padding: 15,
    backgroundColor: "#1ED2AF",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  card: {
    borderWidth: 2,
    borderColor: "black",
    padding: 4,
    backgroundColor: "white",
    marginBottom: 12,
  },
  cardDate: {
    fontSize: 12,
    color: "black",
    marginBottom: 2,
  },
  cardSteps: {
    fontSize: 24,
    marginBottom: 8,
  },
});
