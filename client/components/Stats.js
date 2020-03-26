import React from 'react';
import {
  List,
  ListItem,
  Left,
  Right,
  Text
} from 'native-base';

export default function Stats(props, {navigation}) {
  // const navigation = props.navigation;
  return (
    <List>
        {props.stats.map((item, index) => (
            <ListItem key={index} 
            // onPress={() => navigation.navigate('DashboardScreen')}
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
            word + '   '
          ))}</Text>
        </ListItem>}
    </List>
  );
}
