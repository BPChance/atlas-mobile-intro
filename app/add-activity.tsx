import { Link, router } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { useState } from "react";
import { addActivity } from "@/utils/database";

export default function AddActivity() {
  const [steps, setSteps] = useState("");

  async function handleAdd() {
    const stepsNum = parseInt(steps);
    const dateUnix = Math.floor(Date.now() / 1000);

    if (isNaN(stepsNum)) {
      Alert.alert("Invalid input", "Steps and date must be numbers.");
      return;
    }

    await addActivity(stepsNum, dateUnix);
    router.replace("/");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Activity</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Steps"
        keyboardType="numeric"
        value={steps}
        onChangeText={setSteps}
      />
      <Pressable style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Add activity</Text>
      </Pressable>
      <Link href={"/"} replace asChild>
        <Pressable style={styles.link}>
          <Text style={styles.linkText}>Go Back</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 100,
    justifyContent: "center",
    backgroundColor: "#FEF9E6",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 9,
    textAlign: "center",
  },
  input: {
    borderWidth: 2,
    borderColor: "black",
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#1ED2AF",
    padding: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  link: {
    backgroundColor: "#D00414",
    padding: 15,
    alignItems: "center",
  },
  linkText: {
    color: "white",
  },
});
