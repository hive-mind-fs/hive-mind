import React from 'react';
import { Icon } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashboardScreen, PlayScreen, ProfileScreen } from '.';

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
        name="Play"
        component={PlayScreen}
        options={{
          tabBarLabel: 'Play',
          tabBarIcon: ({ color }) => (
            <Icon active name="trophy" style={{ fontSize: 36, color }} />
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          showLabel: false,
          tabBarIcon: ({ color }) => (
            <Icon active name="person" style={{ fontSize: 36, color }} />
          )
        }}
      />
    </Tab.Navigator>
  );
}