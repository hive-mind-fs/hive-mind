import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Image, StyleSheet, ActivityIndicator } from 'react-native';
// import Expo  from 'expo';
import * as Facebook from 'expo-facebook';

export default function FBLogin(){

const [isLoggedin, setLoggedinStatus] = useState(false);
const [userData, setUserData] = useState([]);
const [isImageLoading, setImageLoadStatus] = useState(false);


  const facebookLogIn = async () => {
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
    setImageLoadStatus(false);
  };

//   const renderButton = () => (
//     <TouchableOpacity onPress={() => login()}>
//       <View
//         style={{
//           width: '100%',
//           alignSelf: 'center',
//           borderRadius: 4,
//           padding: 24,
//           backgroundColor: '#3B5998',
//         }}>
//         <Text style={{ color: 'white', fontWeight: 'bold' }}>
//           Login with Facebook
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );

    return (
    isLoggedin ?
        userData ?
      <View >
        <ActivityIndicator size="large" color="#0000ff" animating={!isImageLoading} style={{ position: "absolute" }} />
           <Image
            style={{ width: 200, height: 200, borderRadius: 50 }}
            source={{ uri: userData.picture.data.url }}
            onLoadEnd={() => setImageLoadStatus(true)} />
    <Text style={{ fontSize: 22, marginVertical: 10}}> Hi {userData.name}!</Text>
    <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
            <Text style={{ color: "#fff" }}>Logout</Text>
          </TouchableOpacity>

      </View>
      :
      null
      :
      <View style={styles.container}>
        <TouchableOpacity style={styles.loginBtn} onPress={() => facebookLogIn()}>
          <Text style={{ color: "#fff" }}>Login with Facebook</Text>
        </TouchableOpacity>
      </View>
    );
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e9ebee',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginBtn: {
      backgroundColor: '#4267b2',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20
    },
    logoutBtn: {
      backgroundColor: '#4267b2',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
      position: "absolute",
      left: 35,
      bottom: -50
    },
  });
