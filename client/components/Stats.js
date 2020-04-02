import React from 'react';
import { List, ListItem, Left, Right, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';

export default function Stats(props) {
  const navigation = useNavigation();

  return (
    <List>
      {props.stats.map((item, index) => (
        <ListItem key={index} onPress={() => navigation.navigate('PlayScreen')}>
          <Left>
            <Text>{Object.values(item)[0]}</Text>
          </Left>
          <Right>
            <Text>{Object.values(item)[1]}</Text>
          </Right>
        </ListItem>
      ))}
      {props.words && (
        <ListItem>
          <Text>{props.words.map(word => word.word + '   ')}</Text>
        </ListItem>
      )}
    </List>
  );
}
