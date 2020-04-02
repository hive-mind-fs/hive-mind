import React from 'react';
import { Icon } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LeaderboardScreen, PlayScreen, ProfileScreen, LobbyScreen } from '.';

const Tab = createBottomTabNavigator();

export default function Nav() {
  return (
    // <NavigationContainer>
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'lightgray',
        showLabel: false,
        tabStyle: {
          paddingTop: 15
        },
        style: {
          height: 90
        }
      }}
    >
      <Tab.Screen
        name="PlayScreen"
        component={PlayScreen}
        options={{
          tabBarLabel: 'Play',
          tabBarIcon: ({ color }) => (
            <Icon active name="heart" style={{ fontSize: 36, color }} />
          )
        }}
      />
      <Tab.Screen
        name="LeaderboardScreen"
        component={LeaderboardScreen}
        options={{
          tabBarLabel: 'Leaderboard',
          tabBarIcon: ({ color }) => (
            <Icon active name="trophy" style={{ fontSize: 36, color }} />
          )
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          showLabel: false,
          tabBarIcon: ({ color }) => (
            <Icon active name="person" style={{ fontSize: 36, color }} />
          )
        }}
      />
      <Tab.Screen
        name="LobbyScreen"
        component={LobbyScreen}
      />

    </Tab.Navigator>
  );
}
