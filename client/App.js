import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppLoading, registerRootComponent } from 'expo';
import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import {
  CountdownScreen,
  GameBoardScreen,
  HomeScreen,
  LandingScreen,
  LoginScreen,
  PlayScreen,
  PostRoundScreen,
  ProfileScreen,
  RulesScreen,
  SignupScreen
} from './screens';
import store from './store';
import colors from './utils/styles';
import { StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import customMaterial from './native-base-theme/variables/customMaterial';

const Stack = createStackNavigator();

const navStyle = {
  headerBackTitleVisible: false,
  headerTitleStyle: {
    color: colors.BLACK
  },
  headerTintColor: colors.GOLD
};


const home = (
  <Stack.Screen
    name="HomeScreen"
    component={HomeScreen}
    options={{ headerShown: false }}
  />
);
const play = (
  <Stack.Screen
    name="PlayScreen"
    component={PlayScreen}
    options={{ headerShown: false }}
  />
);
const rules = (
  <Stack.Screen
    name="RulesScreen"
    component={RulesScreen}
    options={{ headerShown: false }}
  />
);
const countdown = (
  <Stack.Screen
    name="CountdownScreen"
    component={CountdownScreen}
    options={{ headerShown: false }}
  />
);
const game = (
  <Stack.Screen
    name="GameBoardScreen"
    component={GameBoardScreen}
    options={{ headerShown: false }}
  />
);
const after = (
  <Stack.Screen name="PostRoundScreen" component={PostRoundScreen} />
);

const landing = (
  <Stack.Screen
    name="LandingScreen"
    component={LandingScreen}
    options={{ headerShown: false }}
  />
);
const login = (
  <Stack.Screen
    name="LoginScreen"
    component={LoginScreen}
    options={{
      headerTitle: 'Log In',
      ...navStyle
    }}
  />
);
const signup = (
  <Stack.Screen
    name="SignupScreen"
    component={SignupScreen}
    options={{ headerTitle: 'Sign Up', ...navStyle }}
  />
);

const profile = <Stack.Screen name="ProfileScreen" component={ProfileScreen} />;

export function App() {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!isReady) {
      (async () => {
        await Font.loadAsync({
          Roboto: require('native-base/Fonts/Roboto.ttf'),
          Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
          ...Ionicons.font
        });
        const userString = await AsyncStorage.getItem('user');
        const user = JSON.parse(userString);
        if (user) {
          setUser(user);
        }
        setIsReady(true);
      })();
    }
  });

  if (!isReady) {
    return <AppLoading />;
  }

  if (user) {
    console.log('user is logged in', user);
    return (
      <Provider store={store}>
        <StyleProvider style={getTheme(customMaterial)}>
          <NavigationContainer>
            <Stack.Navigator>
              {home}
              {play}
              {rules}
              {countdown}
              {game}
              {after}
              {profile}
              {landing}
              {login}
              {signup}
            </Stack.Navigator>
          </NavigationContainer>
      </StyleProvider>
        </Provider>
    );
  } else {
    console.log('user is not logged in', user);
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            {landing}
            {signup}
            {home}
            {play}
            {rules}
            {countdown}
            {game}
            {after}
            {profile}
            {login}
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default registerRootComponent(App);
