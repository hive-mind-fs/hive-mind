import { Container, Content, Form, Item, Input } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';
import { auth } from '../store';

const SignupScreen = ({ handleSubmit, navigation, user }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user.id) {
      navigation.navigate('PlayScreen');
    }
  });

  return (
    <Container>
      <Content>
        <Form>
          <Item>
            <Input
              placeholder="Email"
              autoCapitalize="none"
              onChange={e => setEmail(e.nativeEvent.text)}
            />
          </Item>
          <Item last>
            <Input
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry={true}
              onChange={e => setPassword(e.nativeEvent.text)}
            />
          </Item>
          <Button
            title="Sign Up"
            onPress={() => handleSubmit(email, password)}
          />
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
