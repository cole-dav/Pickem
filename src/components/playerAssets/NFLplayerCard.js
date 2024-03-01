import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import supabase from '../../config/supabaseClient';

export const NFLplayerCard = ({player}) => {
  const navigation = useNavigation(); // Use navigation hook from react-navigation

  return (
    <View style={styles.card}>
      {/* <Text style={styles.header}>{player.Player}</Text>
      <Text style={styles.text}>{player.Team}</Text>
      <View style={styles.rank}>
        <Text style={styles.text}>{player.Rank}</Text>
      </View> */}
      {/* <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('YourScreenName', {rank: player.PID})
          }>
          <Text>Edit</Text> {/* Replaced material icon with Text */}
      {/* </TouchableOpacity> */}
      {/* </View> */}
      <Text> fhwohfhe</Text>
    </View>
  );
};

const styles = {
  card: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
  rank: {
    padding: 5,
  },
  buttons: {
    flexDirection: 'row',
  },
};
