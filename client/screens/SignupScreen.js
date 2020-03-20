import React from 'react';
import { Button, Text } from 'react-native';
import { Container, Header, Content, Form, Item, Input } from 'native-base';

export default function SignupScreen({ navigation }) {
  return (
    <Container>
      <Content>
        <Form>
          <Item>
            <Input placeholder="Email" />
          </Item>
          <Item last>
            <Input placeholder="Password" secureTextEntry={true} />
          </Item>
          <Button title="Sign Up" onPress={() => console.log('Sign up!')} />
          <Button
            title="Go to Dashboard"
            onPress={() => navigation.navigate('DashboardScreen')}
          />
        </Form>
      </Content>
    </Container>
  );
}
