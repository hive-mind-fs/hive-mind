import React from 'react';
import { Container } from 'native-base';
import Hive from '../components/Hive';

export default function HiveScreen({ navigation }) {
  return (
    <Container
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Hive centerLetter="A" otherLetters={['B', 'C', 'D', 'E', 'F', 'G']} />
    </Container>
  );
}
