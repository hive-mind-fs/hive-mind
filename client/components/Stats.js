import React from 'react';
import { Text } from 'react-native';
import {
  List,
  ListItem,
  Left,
  Right,
} from 'native-base';

export default function Stats(props) {
  console.log('PROPS', props)
  return (
    <List>
        {props.stats.map((item, index) => (
            <ListItem key={index} 
            // onPress={() => props.navigation.navigate('DashboardScreen')}
            >
                <Left>
                    <Text>{ item.title }</Text>
                </Left>
                <Right>
                    <Text>{ item.stat }</Text>
                </Right>
            </ListItem>
        ))}
        {props.words && 
        <ListItem>
          <Text>{props.words.map(word => (
            word + '  '
          ))}</Text>
        </ListItem>}
    </List>
  );
}
