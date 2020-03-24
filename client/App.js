import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppLoading, registerRootComponent } from 'expo';
import * as Font from 'expo-font';
import React from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
// import { Stats } from './components';
import {
  CountdownScreen,
  DashboardScreen,
  Game,
  GameBoardScreen,
  HomeScreen,
  HiveScreen,
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

const Stack = createStackNavigator();

const navStyle = {
  headerBackTitleVisible: false,
  headerTitleStyle: {
    color: colors.BLACK
  },
  headerTintColor: colors.GOLD
};

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
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
          <Stack.Screen name="CountdownScreen" component={CountdownScreen} />
          <Stack.Screen name="Game" component={Game} />
          <Stack.Screen name="GameBoardScreen" component={GameBoardScreen} />
          <Stack.Screen name="HiveScreen" component={HiveScreen} />
          <Stack.Screen name="PlayScreen" component={PlayScreen} />
          <Stack.Screen name="PostRoundScreen" component={PostRoundScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="RulesScreen" component={RulesScreen} />
          {/* <Stack.Screen name="Stats" component={Stats} /> */}
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
