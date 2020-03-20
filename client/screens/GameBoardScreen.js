import React from 'react';
import { Button, Text, StyleSheet, View } from 'react-native';
import { Body, Card, CardItem, Container, Left, Right } from 'native-base';

const wordsGot = ['this', 'team', 'is', 'poppin'];
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

export default function GameBoardScreen({ navigation }) {
  return (
    <Container
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text>Time 5:00 - Score 25</Text>

      <Card>
        <CardItem header bordered>
          <Text>Words Got</Text>
        </CardItem>
        {wordsGot.map(word => (
          <CardItem key={word}>
            <Text>{word}</Text>
          </CardItem>
        ))}
      </Card>
      <View style={styles.gameBoard}>
        {letters.map(letter => (
          <Button
            style={styles.gameButtons}
            key={letter}
            title={letter}
            onPress={() => navigation.navigate('')}
          />
        ))}
      </View>
      <View style={styles.flexRow}>
        <Button
          title="Delete"
          onPress={() => navigation.navigate('DashboardScreen')}
        />
        <Button
          title="Shuffle"
          onPress={() => navigation.navigate('DashboardScreen')}
        />
        <Button
          title="Enter"
          onPress={() => navigation.navigate('DashboardScreen')}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  gameBoard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    margin: 10
  },
  gameButtons: {
    paddingLeft: 10,
    marginRight: 10
  }
});
