import "react-native-gesture-handler";
import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { AppLoading, registerRootComponent } from "expo";
import { Container } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  CountdownScreen,
  DashboardScreen,
  GameBoardScreen,
  LandingScreen,
  LoginScreen,
  PlayScreen,
  PostRoundScreen,
  ProfileScreen,
  RulesScreen,
  SignupScreen
} from "./screens";

const Stack = createStackNavigator();

export function App() {
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    async () => {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        ...Ionicons.font
      });
    };
    setIsReady(true);
  });

  if (!isReady) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
        <Stack.Screen name="CountdownScreen" component={CountdownScreen} />
        <Stack.Screen name="GameBoardScreen" component={GameBoardScreen} />
        <Stack.Screen name="LandingScreen" component={LandingScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="PlayScreen" component={PlayScreen} />
        <Stack.Screen name="PostRoundScreen" component={PostRoundScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="RulesScreen" component={RulesScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default registerRootComponent(App);
