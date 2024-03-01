import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Matchmaking from "./Matchmaking";
import History from "./History";
import Live from "./Live";
import Login from "./Login";

const Stack = createStackNavigator();

const FeedStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Matchmaking" // Set the initial route to "Matchmaking"
    >
      <Stack.Screen name="Matchmaking" component={Matchmaking} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Live" component={Live} />
      <Stack.Screen name="History" component={History} />
    </Stack.Navigator>
  );
};

const RivalsNav = () => {
  return (
    <View style={{ flex: 1 }}>
      <FeedStack />
    </View>
  );
};

export default RivalsNav;
