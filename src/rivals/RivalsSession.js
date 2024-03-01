import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
const RivalsSession = () => {
  return (
    <View style={styles.container}>
      <Timer />
      <View style={styles.cardList}>
        <MatchCard
          homeTeamRank={1}
          awayTeamRank={18}
          playerName="Tyreek Hill"
        />
        <Card type="Over" />
        <Card type="Under" />
      </View>
    </View>
  );
};

const Timer = () => {
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [seconds]);
  return (
    <View style={styles.timer}>
      <Text style={styles.timerText}>{seconds}</Text>
    </View>
  );
};

const MatchCard = ({homeTeamRank, awayTeamRank, playerName}) => {
  const getRankColor = rank => (rank < 18 ? 'green' : 'red');

  return (
    <View style={[styles.card, styles.commonCard]}>
      <View style={{flex: 1, alignItems: 'flex-start'}}>
        <Text style={styles.playerName}>{playerName}</Text>
        <GameDetails />
        <Ranking
          homeTeamRank={homeTeamRank}
          awayTeamRank={awayTeamRank}
          getRankColor={getRankColor}
        />
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>92.5 Rec Yards</Text>
        <ActionButtons />
      </View>
    </View>
  );
};

const Card = ({type}) => (
  <View style={[styles[type.toLowerCase() + 'Card'], styles.commonCard]}>
    <View style={{flex: 1, alignItems: 'flex-start'}}>
      <Text>Tyreek Hill</Text>
      <Text>Miami vs Detroit</Text>
      <Text>ENG T20 MATCH 2022</Text>
    </View>
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>92.5 Rec Yards</Text>
      <Text>{type.toUpperCase()}</Text>
    </View>
  </View>
);

const GameDetails = () => (
  <Text>
    <Text style={{color: '#5030E5'}}>1:00 12/16 </Text>
    <Text style={{color: '#FFFFFF'}}>| Miami vs Detroit</Text>
  </Text>
);

const Ranking = ({homeTeamRank, awayTeamRank, getRankColor}) => (
  <Text>
    <Text style={{color: '#FFFFFF'}}>Mia Off: </Text>
    <Text style={{color: getRankColor(homeTeamRank)}}>{homeTeamRank}th </Text>
    <Text style={{color: '#FFFFFF'}}>Det Def: </Text>
    <Text style={{color: getRankColor(awayTeamRank)}}>{awayTeamRank}th</Text>
  </Text>
);

const ActionButtons = () => (
  <View style={styles.actions}>
    <TouchableOpacity style={styles.button} onPress={() => {}}>
      <Text style={{color: 'green'}}>✓</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={() => {}}>
      <Text style={{color: 'red'}}>✕</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  timer: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#FF9548',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  timerText: {
    color: 'black',
    fontSize: 24,
  },
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
  },
  cardList: {
    flex: 1,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    borderRadius: 14,
    borderWidth: 1,
    backgroundColor: '#8B8B93',
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
  },
  commonCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
  },
  playerName: {
    color: '#222222',
  },
  overCard: {
    backgroundColor: '#16B7B8',
  },
  underCard: {
    backgroundColor: '#FF563C',
  },
  actions: {
    // styles for action buttons
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  button: {
    backgroundColor: '#fff', // Example color
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5, // Adds spacing between buttons
    // Add more styling as needed
  },
  // ... rest of your styles ...
});

export default RivalsSession;
