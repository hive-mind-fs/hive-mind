import React, { useState } from 'react';
import { Button, Container, H1, Text } from 'native-base';
import { Logo } from '../components';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import * as Facebook from 'expo-facebook';
import { auth } from '../store';

const LandingScreen = ({ navigation, handleFBLogin }) => {
  const [isLoggedin, setLoggedinStatus] = useState(false);
  const [userData, setUserData] = useState([]);
  const [isImageLoading, setImageLoadStatus] = useState(false);
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);

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
            setEmail(data.email);
            setPassword(data.id);
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

        <TouchableOpacity
          style={styles.playBtn}
          onPress={() => {
            console.log('logging fb user in');
            handleFBLogin(email, password);
            navigation.navigate('PlayScreen');
          }}
        >
          <Text style={{ color: '#ffff' }}>Play</Text>
        </TouchableOpacity>
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

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          facebookLogIn();
        }}
      >
        <Text style={{ color: '#fff' }}>Login with Facebook</Text>
      </TouchableOpacity>
    </Container>
  );
};

const styles = StyleSheet.create({
  loginBtn: {
    backgroundColor: '#4267b2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    top: 10
  },
  logoutBtn: {
    backgroundColor: '#4267b2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    position: 'absolute',
    bottom: 275
  },
  playBtn: {
    backgroundColor: '#4267b2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    position: 'absolute',
    bottom: 200
  }
});

const mapState = state => {
  return {
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    handleFBLogin: (email, password) =>
      dispatch(auth(email, password, 'signup'))
  };
};

export default connect(mapState, mapDispatch)(LandingScreen);
