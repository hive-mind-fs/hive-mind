import React, { useState } from 'react';
import { Container } from 'native-base';
import { Logo } from '../components';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  Button
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
      <Container
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <View>
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

        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => navigation.navigate('PlayScreen')}
        >
          <Text style={{ color: '#fff' }}>Play</Text>
        </TouchableOpacity>
      </View>
      </Container>
    ) : null
  ) : (
    <Container
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Logo />
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate('SignupScreen')}
      />
      <Button
        title="Log In"
        onPress={() => navigation.navigate('LoginScreen')}
      />
      <TouchableOpacity style={styles.loginBtn} onPress={() => facebookLogIn()}>
        <Text style={{ color: '#fff' }}>Login with Facebook</Text>
      </TouchableOpacity>
    </Container>
  );
}

const styles = StyleSheet.create({
  loginBtn: {
    backgroundColor: '#4267b2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    top: 50
  },
  logoutBtn: {
    backgroundColor: '#4267b2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    position: 'absolute',
    left: 35,
    bottom: -50
  }
});
