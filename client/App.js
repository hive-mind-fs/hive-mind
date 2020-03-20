import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { AppLoading, registerRootComponent } from 'expo';
import { Container } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Login from './Login';

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
    <Container style={styles.container}>
      <Login />
    </Container>
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
