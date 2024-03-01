import React, { useState,useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import supabase from "../supabaseClient";


const Matchmaking = () => {
  const navigation = useNavigation();

  const goToLogin = () => navigation.navigate("Login");
  const goToHistoryScreen = () => navigation.navigate("History");
  const goToLiveScreen = () => navigation.navigate("Live");


  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session);
    });

    const {
      data: {subscription},
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  //USERR

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const session = supabase.auth.getSession();
    setUser(session?.user ?? null);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.titleText, { color: "#fff" }]}>Pitch</Text>
      <Text style={[styles.titleText, { color: "#fff" }]}>
        Pick DFS props against your friends
      </Text>
      {user ? (
        <Text style={styles.titleText}>{user.user_metadata?.full_name || 'User'}</Text>
      ) : (
        <Text style={styles.titleText}>Please log in</Text>
      )}
      <View style={styles.row}>
        <TouchableOpacity onPress={openModal} style={styles.button}>
          <Text style={styles.titleText}>How to play</Text>
          {/* <Text style={styles.subText}>12/20 Games Remaining this Week</Text> */}
        </TouchableOpacity>

        {!user && (
          <TouchableOpacity onPress={goToLogin} style={styles.button}>
            <Text style={styles.titleText}>Log in</Text>
            {/* Optionally include additional text or elements here */}
          </TouchableOpacity>
        )}


        <TouchableOpacity onPress={goToLiveScreen} style={styles.button}>
          <Text style={styles.titleText}>Play</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={goToHistoryScreen} style={styles.button}>
        <Text style={styles.titleText}>History</Text>
      </TouchableOpacity>


      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            {/* Back Button */}
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Back</Text>
            </TouchableOpacity>

            {/* How to Play Text */}
            <Text style={styles.howToPlayText}>
              Quick Guide:
              {"\n\n"}- After clicking "Draft", select from 5 player props.
              {"\n"}- Choose over or under for the projected total.        
              {"\n"}- If you pick over, your rival gets under, and vice versa.
              {"\n"}- Invite a rival. Draft order: you, rival, you, then rival picks twice.
              {"\n"}- Winners are decided after real-life results are in.
            </Text>
          </View>
        </View>
      </Modal>


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
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalContent: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end', // Positions the close button to the right
  },
  closeButtonText: {
    // Styles for the close button text
  },
  howToPlayText: {
    marginTop: 20, // Add some spacing between the close button and the text
    // Styles for the how to play text
  },
});

export default Matchmaking;
