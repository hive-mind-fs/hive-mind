import React, { Fragment } from 'react';
import { FlatList } from 'react-native';
import { List, ListItem, Left, Right, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { color } from 'react-native-reanimated';
// import { FlatList } from 'react-native-gesture-handler';

export default function Stats({ stats, header }) {
  const navigation = useNavigation();

  return (
    <FlatList
      data={stats}
      keyExtractor={(item, idx) => idx}
      ListHeaderComponent={
        header && (
          <ListItem>
            <Left>
              <Text note>{header[0]}</Text>
            </Left>
            <Right>
              <Text note>{header[1]}</Text>
            </Right>
          </ListItem>
        )
      }
      renderItem={item => {
        return (
          <ListItem>
            <Left>
              <Text>{Object.values(item.item)[0]}</Text>
            </Left>
            <Right>
              <Text>{Object.values(item.item)[1]}</Text>
            </Right>
          </ListItem>
        );
      }}
    />

    // {props.words && (
    //   <ListItem>
    //     <Text>{props.words.map(word => word.word + '   ')}</Text>
    //   </ListItem>
    // )}
    // </List>
  );
}
