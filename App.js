import "react-native-url-polyfill/auto";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-native-paper";
import RivalsNav from "./src/rivals/RivalsNav";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <Provider>
        <RivalsNav></RivalsNav>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
