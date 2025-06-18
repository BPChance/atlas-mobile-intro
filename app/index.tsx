import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import {
  fetchActivities,
  deleteAllActivities,
  deleteActivityById,
} from "@/utils/database";
import { FlashList } from "@shopify/flash-list";
import { Swipeable } from "react-native-gesture-handler";

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

  function renderActions(id: number) {
    return (
      <Pressable
        onPress={async () => {
          await deleteActivityById(id);
          loadActivities();
        }}
        style={styles.swipeDelete}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlashList
          data={activities}
          keyExtractor={(item) => item.id.toString()}
          estimatedItemSize={50}
          renderItem={({ item }) => (
            <Swipeable
              renderRightActions={() => renderActions(item.id)}
              renderLeftActions={() => renderActions(item.id)}
            >
              <View style={styles.card}>
                <Text style={styles.cardDate}>{formatDate(item.date)}</Text>
                <Text style={styles.cardSteps}>
                  Steps: {item.steps.toLocaleString()}
                </Text>
              </View>
            </Swipeable>
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
      <Pressable
        style={[styles.button, styles.deleteButton]}
        onPress={async () => {
          await deleteAllActivities();
          loadActivities();
        }}
      >
        <Text style={styles.buttonText}>Delete all activities</Text>
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
  button: {
    padding: 20,
    backgroundColor: "#1ED2AF",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  deleteButton: {
    backgroundColor: "#D00414",
  },
  deleteButtonText: {
    color: "white",
  },
  swipeDelete: {
    backgroundColor: "#D00414",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 12,
    height: 70,
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
    fontSize: 14,
    color: "black",
    marginBottom: 2,
  },
  cardSteps: {
    fontSize: 26,
    marginBottom: 8,
  },
});
