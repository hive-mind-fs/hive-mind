import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Container, H1, H3, View, Text } from 'native-base';

export default function RulesScreen({ navigation }) {
  const howToBullets1 = [
    'Words must contain at least 4 letters.',
    'Words must include the center letter.',
    'Our word list does not include words that are obscure, hyphenated, or proper nouns.',
    'No cussing either, sorry.',
    'Letters can be used more than once.'
  ];
  const howToBullets2 = [
    '4-letter words are worth 1 point each.',
    'Longer words earn 1 point per letter.',
    'Each puzzle includes at least one “pangram” which uses every letter. These are worth 7 extra points!'
  ];

  return (
    <Container>
      <View style={styles.container}>
        <H1 style={styles.H1}>How To Play</H1>
        <H3 style={styles.H3}>Create words using letters from the hive.</H3>
        {howToBullets1.map((bullet, idx) => (
          <Text key={idx} style={styles.Text}>
            - {bullet}
          </Text>
        ))}

        <H3 style={styles.H3}>Score points to increase your rating.</H3>
        {howToBullets2.map((bullet, idx) => (
          <Text key={idx} style={styles.Text}>
            - {bullet}
          </Text>
        ))}

        <Button
          primary
          rounded
          block
          marginTopL
          title="I Got It"
          onPress={() => navigation.navigate('PlayScreen')}
        >
          <Text style={styles.buttonText}>I Got It</Text>
        </Button>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1
  },
  H1: {
    textAlign: 'center'
  },
  H3: {
    marginTop: 30,
    textAlign: 'left'
  },
  Text: {
    marginTop: 7,
    textAlign: 'left'
  },
  container: {
    alignContent: 'flex-start'
  }
});
