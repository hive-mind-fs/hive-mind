import { Container, Header, Content, Form, Item, Input } from 'native-base';
import React, { useState } from 'react';
import { Button, Text } from 'react-native';
import { connect } from 'react-redux';
import { auth } from '../store';

const SignupScreen = ({ navigation, handleSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container>
      <Content>
        <Form>
          <Item>
            <Input
              placeholder="Email"
              onChange={e => setEmail(e.nativeEvent.text)}
            />
          </Item>
          <Item last>
            <Input
              placeholder="Password"
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

const mapDispatch = dispatch => {
  return {
    handleSubmit: (email, password) => dispatch(auth(email, password, 'signup'))
  };
};

export default connect(null, mapDispatch)(SignupScreen);
