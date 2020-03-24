import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import { AppLoading, registerRootComponent } from 'expo';
import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import {
  CountdownScreen,
  GameBoardScreen,
  LandingScreen,
  LoginScreen,
  PlayScreen,
  PostRoundScreen,
  ProfileScreen,
  RulesScreen,
  SignupScreen
} from './screens';
import store, { getUser } from './store';
import colors from './utils/styles';

const Stack = createStackNavigator();

const navStyle = {
  headerBackTitleVisible: false,
  headerTitleStyle: {
    color: colors.BLACK
  },
  headerTintColor: colors.GOLD
};

const BASE_URL = 'http://localhost:8080';

const play = (
  <Stack.Screen
    name="PlayScreen"
    component={PlayScreen}
    options={{ headerShown: false }}
  />
);
const rules = <Stack.Screen name="RulesScreen" component={RulesScreen} />;
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
const profile = <Stack.Screen name="ProfileScreen" component={ProfileScreen} />;

export function App() {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState({});

  async function me() {
    const { data } = await axios.get(`${BASE_URL}/auth/me`);
    store.dispatch(getUser(data));
    setUser(data);
  }

  useEffect(() => {
    async () => {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font
      });
    };
    setIsReady(true);
  });

  if (!isReady) {
    return <AppLoading />;
  }

  if (user.id) {
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {play}
          {rules}
          {countdown}
          {game}
          {after}
          {profile}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LandingScreen"
            component={LandingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              headerTitle: 'Log In',
              ...navStyle
            }}
          />
          <Stack.Screen
            name="SignupScreen"
            component={SignupScreen}
            options={{ headerTitle: 'Sign Up', ...navStyle }}
          />
          {play}
          {rules}
          {countdown}
          {game}
          {after}
          {profile}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default registerRootComponent(App);
