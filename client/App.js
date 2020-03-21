import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppLoading, registerRootComponent } from 'expo';
import * as Font from 'expo-font';
import React from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { Nav, Stats } from './components'
import {
  CountdownScreen,
  DashboardScreen,
  Game,
  GameBoardScreen,
  HiveScreen,
  LandingScreen,
  LoginScreen,
  PlayScreen,
  PostRoundScreen,
  ProfileScreen,
  RulesScreen,
  SignupScreen
} from './screens';
import store from './store/store';

const Stack = createStackNavigator();

export function App() {
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
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
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
          <Stack.Screen name="CountdownScreen" component={CountdownScreen} />
          <Stack.Screen name="Game" component={Game} />
          <Stack.Screen name="GameBoardScreen" component={GameBoardScreen} />
          <Stack.Screen name="HiveScreen" component={HiveScreen} />
          <Stack.Screen name="LandingScreen" component={LandingScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="PlayScreen" component={PlayScreen} />
          <Stack.Screen name="PostRoundScreen" component={PostRoundScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="RulesScreen" component={RulesScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen name="Nav" component={Nav} />
          <Stack.Screen name="Stats" component={Stats} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default registerRootComponent(App);
