import React, { useState } from 'react';
import { Button, Container, Icon, H1, Text } from 'native-base';
import { Logo } from '../components';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import * as Facebook from 'expo-facebook';

export default function LandingScreen({ navigation }) {
  const [isLoggedin, setLoggedinStatus] = useState(false);
  const [userData, setUserData] = useState([]);
  const [isImageLoading, setImageLoadStatus] = useState(false);

  const facebookLogIn = async () => {
    try {
      await Facebook.initializeAsync('3845977412082426');
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email', 'user_friends']
      });

      if (type === 'success') {
        fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`
        )
          .then(response => response.json())
          .then(data => {
            setLoggedinStatus(true);
            setUserData(data);
            setImageLoadStatus(true);
          })
          .catch(e => console.log(e));
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  // const logout = () => {
  //   setLoggedinStatus(false);
  //   setUserData(null);
  //   setImageLoadStatus(false);
  // };

  return isLoggedin ? (
    userData && isImageLoading ? (
      <Container>
        <Logo xlarge />
        <H1>Hive Mind</H1>
        <ActivityIndicator
          size="large"
          color="#0000ff"
          animating={!isImageLoading}
          style={{ position: 'absolute' }}
        />
        <Image
          style={{ width: 200, height: 200, borderRadius: 50 }}
          source={{ uri: userData.picture.data.url }}
        />

        <Text style={{ fontSize: 22, marginVertical: 10 }}>
          {' '}
          Hi {userData.name}!
        </Text>

        <Button
          rounded
          block
          iconLeft
          bordered
          marginTop
          onPress={() => navigation.navigate('PlayScreen')}
        >
          <Text>Play</Text>
        </Button>
      </Container>
    ) : null
  ) : (
    <Container
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Logo />

      <Button
        rounded
        block
        marginTop
        bordered
        title="Sign Up"
        onPress={() => navigation.navigate('SignupScreen')}
      >
        <Text>Sign Up</Text>
      </Button>
      <Button
        rounded
        block
        marginTop
        bordered
        title="Log In"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        <Text>Log In</Text>
      </Button>

      <Button
        rounded
        block
        iconLeft
        bordered
        marginTop
        onPress={() => facebookLogIn()}
      >
        <Icon name="logo-facebook" />
        <Text>Log In With Facebook</Text>
      </Button>

      {/* <TouchableOpacity style={styles.loginBtn} >
        <Text style={{ color: '#fff' }}>Login with Facebook</Text>
      </TouchableOpacity> */}
    </Container>
  );
}
