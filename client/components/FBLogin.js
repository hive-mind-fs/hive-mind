import React, { Component, useState } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
// import Expo  from 'expo';
import * as Facebook from 'expo-facebook';

export default function FBLogin(){

const [isLoggedin, setLoggedinStatus] = useState(false);
const [userData, setUserData] = useState([]);
//   callGraph = async token => {
//     /// Look at the fields... I don't have an `about` on my profile but everything else should get returned.
//     const response = await fetch(
//       `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,picture`
//     );
//     const userData = JSON.stringify(await response.json());
//     setUserData({ responseJSON });
//   };

  const login = async () => {
    try {
    await Facebook.initializeAsync('3845977412082426');
    const {type, token } = await Facebook.logInWithReadPermissionsAsync({permissions: ['public_profile', 'email', 'user_friends'],
    });

    if (type === 'success') {
        fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
        .then(response => response.json())
        .then(data => {
          setLoggedinStatus(true);
          setUserData(data);
        })
        .catch(e => console.log(e));
     } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
};

const logout = () => {
    setLoggedinStatus(false);
    setUserData(null);
  }

  const renderButton = () => (
    <TouchableOpacity onPress={() => login()}>
      <View
        style={{
          width: '100%',
          alignSelf: 'center',
          borderRadius: 4,
          padding: 24,
          backgroundColor: '#3B5998',
        }}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          Login with Facebook
        </Text>
      </View>
    </TouchableOpacity>
  );

    const  renderValue = value => (
    <Text key={value} >{value}</Text>
  );

    return (
    isLoggedin ?
        userData ?
      <View >
       <Image
            style={{ width: 200, height: 200, borderRadius: 50 }}
            source={{ uri: userData.picture.data.url }}
            onLoadEnd={() => setImageLoadStatus(true)} />
    <Text style={{ fontSize: 22, marginVertical: 10, alignContent: "center"}}>Hi {userData.name}!</Text>


      </View>
      :
      null
      :
      <View >
      {renderButton()}
    </View>
    );
  }



