import React, { useEffect, useState } from 'react';
import { Button, Container, Content, Form, Item, Input, Label, Text } from 'native-base';
import { connect } from 'react-redux';
import { auth } from '../store';

const SignupScreen = ({ handleSubmit, navigation, user }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user.id) {
      navigation.navigate('HomeScreen');
    }
  });

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
            rounded block marginTopL
            title="Sign Up"
            onPress={() => handleSubmit(email, password)}
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
