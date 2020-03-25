import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
// import Expo  from 'expo';
import * as Facebook from 'expo-facebook';

export default class FBLogin extends Component {
  state = {
    responseJSON: null,
  };
  callGraph = async token => {
    /// Look at the fields... I don't have an `about` on my profile but everything else should get returned.
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,picture`
    );
    const responseJSON = JSON.stringify(await response.json());
    this.setState({ responseJSON });
  };

  login = async () => {
    await Facebook.initializeAsync('3845977412082426');
    const {type, token } = await Facebook.logInWithReadPermissionsAsync({permissions: ['public_profile', 'email', 'user_friends'],
    });

    if (type === 'success') {
      this.callGraph(token);
    }
  };

  renderButton = () => (
    <TouchableOpacity onPress={() => this.login()}>
      <View
        style={{
          width: '50%',
          alignSelf: 'center',
          borderRadius: 4,
          padding: 24,
          backgroundColor: '#3B5998',
        }}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          Login to Facebook
        </Text>
      </View>
    </TouchableOpacity>
  );
  renderValue = value => (
    <Text key={value} >{value}</Text>
  );
  render() {
    return (
      <View >
        {this.state.responseJSON &&
          this.renderValue('User data : ' + this.state.responseJSON)}

        {this.renderButton()}
      </View>
    );
  }
}


