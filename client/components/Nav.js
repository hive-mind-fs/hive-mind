import React from 'react';
import { Button, Footer, FooterTab, Icon } from 'native-base';

export default function Nav({navigation}) {
  return (
    <Footer>
      <FooterTab>
        <Button
        onPress={() => navigation.navigate('PlayScreen')}
        >
          <Icon active name="trophy" />
        </Button>
        <Button
        onPress={() => navigation.navigate('ProfileScreen')}
        >
          <Icon name="person" />
        </Button>
      </FooterTab>
    </Footer>
  );
}
