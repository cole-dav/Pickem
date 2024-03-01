import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Matchmaking = () => {
  const navigation = useNavigation();

  const goToLogin = () => {
    navigation.navigate("Login");
  };

  const goToFirstQueue = () => {
    navigation.navigate("Login");
  };

  const goToHistoryScreen = () => {
    navigation.navigate("History");
  };

  const goToLiveScreen = () => {
    navigation.navigate("Live"); // Navigate to the "Live" screen
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.titleText, { color: "#fff" }]}>Pitch</Text>
      <Text style={[styles.titleText, { color: "#fff" }]}>
        Pick DFS props against your friends
      </Text>
      <View style={styles.row}>
        <TouchableOpacity onPress={goToFirstQueue} style={styles.button}>
          <Text style={styles.titleText}>How to play</Text>
          {/* <Text style={styles.subText}>12/20 Games Remaining this Week</Text> */}
        </TouchableOpacity>

        <TouchableOpacity onPress={goToLogin} style={styles.button}>
          <Text style={styles.titleText}>Log in</Text>
          {/* <Text style={styles.subText}>1 v 1 Rival Matches </Text> */}
        </TouchableOpacity>

        <TouchableOpacity onPress={goToLiveScreen} style={styles.button}>
          <Text style={styles.titleText}>Play</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={goToHistoryScreen} style={styles.button}>
        <Text style={styles.titleText}>History</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#121212",
  },
  row: {
    flexDirection: "row",
    maxWidth: "60%", // Set a maximum width
    justifyContent: "center", // Center horizontally
    padding: 16,
  },
  button: {
    backgroundColor: "#e7e7e7", // Use your app's color scheme
    padding: 10,
    marginVertical: 10, // Creates space between the buttons
    marginLeft: 20,
    borderRadius: 10,
    width: "60%",
    alignItems: "center",
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000", // Use your app's color scheme
  },
  subText: {
    fontSize: 16,
    color: "#666", // Use your app's color scheme
    marginTop: 4,
  },
});

export default Matchmaking;
