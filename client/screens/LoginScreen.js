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
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { auth } from '../store';

const LoginScreen = ({ handleSubmit, navigation, user }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user.id) {
      navigation.navigate('PlayScreen');
    }
  });

  const handleLogin = () => {
    if (email.length === 0) {
      Alert.alert('You must enter an email');
    } else if (password.length === 0) {
      Alert.alert('You must enter a password');
    } else {
      handleSubmit(email, password);
      if (user.error) {
        Alert.alert('These credentials do not exist');
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
            title="Log In"
            onPress={() => handleLogin()}
          >
            <Text>Log In</Text>
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
    handleSubmit: (email, password) => dispatch(auth(email, password, 'login'))
  };
};

export default connect(mapState, mapDispatch)(LoginScreen);
