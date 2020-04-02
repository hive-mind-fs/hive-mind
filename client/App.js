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
  PostRound1v1Screen,
  ProfileScreen,
  RulesScreen,
  SignupScreen,
  LobbyScreen,
  FriendLobbyScreen
} from './screens';
import store, { getUser } from './store';
import colors from './utils/styles';
import { StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import customMaterial from './native-base-theme/variables/customMaterial';
// establishes socket connection
import './socket';
console.disableYellowBox = true;


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
  <Stack.Screen
    name="PostRoundScreen"
    component={PostRoundScreen}
    options={{ headerShown: false }}
  />
);
const after1v1 = (
  <Stack.Screen
    name="PostRound1v1Screen"
    component={PostRound1v1Screen}
    options={{ headerShown: false }}
  />
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

const lobby = (
  <Stack.Screen
    name="LobbyScreen"
    component={LobbyScreen}
    options={{ headerShown: false }}
  />
);

const friendlobby = (
  <Stack.Screen
    name="FriendLobbyScreen"
    component={FriendLobbyScreen}
    options={{ headerShown: false }}
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
          store.dispatch(getUser(user));
        }
        setIsReady(true);
      })();
    }
  });

  if (!isReady) {
    return <AppLoading />;
  }

  if (user) {
    //    console.log('user is logged in', user);
    return (
      <Provider store={store}>
        <StyleProvider style={getTheme(customMaterial)}>
          <NavigationContainer>
            <Stack.Navigator>
              {home}
              {rules}
              {countdown}
              {game}
              {after}
              {after1v1}
              {landing}
              {login}
              {signup}
              {lobby}
              {friendlobby}
            </Stack.Navigator>
          </NavigationContainer>
        </StyleProvider>
      </Provider>
    );
  } else {
    //    console.log('user is not logged in', user);
    return (
      <Provider store={store}>
        <StyleProvider style={getTheme(customMaterial)}>
          <NavigationContainer>
            <Stack.Navigator>
              {landing}
              {signup}
              {home}
              {rules}
              {countdown}
              {game}
              {after}
              {after1v1}
              {login}
            </Stack.Navigator>
          </NavigationContainer>
        </StyleProvider>
      </Provider>
    );
  }
}

export default registerRootComponent(App);
