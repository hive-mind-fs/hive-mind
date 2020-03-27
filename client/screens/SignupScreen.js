import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Text
} from 'native-base';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { auth } from '../store';
const SignupScreen = ({ handleSubmit, navigation, user }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user.id) {
      navigation.navigate('HomeScreen', { screen: 'PlayScreen' });
    }
  });

  const handleSignup = () => {
    let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passLengthReg = new RegExp('(?=.{8,})');
    let numericReg = new RegExp('(?=.*[0-9])');
    let upperCaseReg = new RegExp('(?=.*[A-Z])');
    let lowerCaseReg = new RegExp('(?=.*[a-z])');
    let specialReg = new RegExp('(?=.*[!@#$%^&*])');
    if (emailReg.test(email) === false) {
      Alert.alert(`${email}` + ' is not a valid email');
    } else if (password.length === 0) {
      Alert.alert('You must enter a password');
    } else if (passLengthReg.test(password) === false) {
      Alert.alert('Your password must be eight characters or longer');
    } else if (numericReg.test(password) === false) {
      Alert.alert('Your password must contain at least 1 numeric character');
    } else if (upperCaseReg.test(password) === false) {
      Alert.alert(
        'Your password must contain at least 1 uppercase alphabetical character'
      );
    } else if (lowerCaseReg.test(password) === false) {
      Alert.alert(
        'Your password must contain at least 1 lowercase alphabetical character'
      );
    } else if (specialReg.test(password) === false) {
      Alert.alert('Your password must contain at least one special character');
    } else {
      handleSubmit(email, password);
      if (user.error) {
        Alert.alert('This email is already in use');
      }
    }
  };

  return (
    <Container form>
      <Content>
        <Form style={{ width: 360 }}>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              placeholder="Email"
              autoCapitalize="none"
              onChange={e => setEmail(e.nativeEvent.text)}
            />
          </Item>
          <Item floatingLabel last>
            <Label>Password</Label>
            <Input
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry={true}
              onChange={e => setPassword(e.nativeEvent.text)}
            />
          </Item>
          <Button
            rounded
            block
            marginTopL
            title="Sign Up"
            onPress={() => {
              handleSignup();
            }}
          >
            <Text>Sign Up</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

const mapState = state => {
  return {
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit: (email, password) => dispatch(auth(email, password, 'signup'))
  };
};

export default connect(mapState, mapDispatch)(SignupScreen);
