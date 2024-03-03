import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Alert, TouchableOpacity } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { createClient } from "@supabase/supabase-js";
import { useRoute, useNavigation } from '@react-navigation/native';
import { handleGameSelection } from '../supabaseClient'; // Adjust this import path as necessary


const supabase = createClient(
  "https://aohggynmsqurtpszrgin.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvaGdneW5tc3F1cnRwc3pyZ2luIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM1MDMyMzUsImV4cCI6MjAwOTA3OTIzNX0.wj2GWnQ6vsoph6Vs17GgLuBuuMt2tctCN9r1kIUCST4"

);

const GameDetails = () => {
  const [gameDetails, setGameDetails] = useState(null);
  // Corrected: Define the state for unPickedGames
  const [unPickedGames, setUnPickedGames] = useState([]);
  const route = useRoute();
  const { gameId } = route.params;

  useEffect(() => {
    const loadGameDetails = async () => {
      if (!gameId) {
        Alert.alert("Error", "Game ID is required.");
        return;
      }
  
      try {
        const { data, error } = await supabase
          .from("pre_rivals")
          .select("*")
          .eq("game_id", gameId)
          .single();
  
        if (error) {
          console.error("Error fetching game details:", error.message);
          Alert.alert("Error", "Failed to load game details.");
        } else {
          setGameDetails(data);
          if (data && data.un_picked) {
            console.log("Raw un_picked data:", data.un_picked);
            try {
              const parsedUnPicked = data.un_picked[0].map(jsonStr => JSON.parse(jsonStr));
              setUnPickedGames(parsedUnPicked);
            } catch (parseError) {
              console.error("Parsing error:", parseError);
            }
          }
        }
      } catch (error) {
        console.error("Error:", error.message);
        Alert.alert("Error", "An unexpected error occurred.");
      }
    };
  
    loadGameDetails();
  }, [gameId]);
  

  const handleSelection = async (pickId, result) => {
    const userId = "644ca2a0-6fe6-4792-a1d6-11ce3b9de8db"; 
    const response = await handleGameSelection(gameDetails, pickId, result, userId);
    console.log("Asdas")
    if (response.success) {
      navigation.goBack(); 
    } else {
      Alert.alert('Update Failed', response.error);
    }
  };

  if (!gameDetails) {
    console.log(gameDetails)
    return (
        <View style={styles.container}>
            <Text>Loading game details...</Text>
        </View>
    );
}

return (
    <View style={styles.container}>
        {/* Render game details here, assuming gameDetails is not null */}
        <Text>Game ID: {gameDetails.game_id}</Text>
        {unPickedGames.map((pick, index) => (
            <Card key={index} style={styles.commonCard}>
                <Card.Content>
                    <Title style={styles.titleText}>{pick.home_team} vs {pick.away_team}</Title>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.winButton]}
                            onPress={() => handleSelection(pick.id, 'Win')}>
                            <Text style={styles.buttonText}>Win</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.loseButton]}
                            onPress={() => handleSelection(pick.id, 'Lose')}>
                            <Text style={styles.buttonText}>Lose</Text>
                        </TouchableOpacity>
                    </View>
                </Card.Content>
            </Card>
        ))}
    </View>
);
};

export default GameDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
  },
  commonCard: {
    borderRadius: 14,
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    marginBottom: 10,
    flexDirection: "column",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    width: "40%",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  winButton: {
    backgroundColor: "#4CAF50", // Green color
  },
  loseButton: {
    backgroundColor: "#F44336", // Red color
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  subText: {
    fontSize: 16,
    color: "#fff",
    marginTop: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Semi-transparent black background
  },
  input: {
    width: "80%",
    height: 40,
    backgroundColor: "#333", // Dark background for the text input
    color: "#fff", // Text color
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
  },
  commonCard: {
    borderRadius: 14,
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    marginBottom: 10,
    flexDirection: "column",
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
});
