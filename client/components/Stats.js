import React from 'react';
import { FlatList } from 'react-native';
import { ListItem, Left, Right, Text } from 'native-base';

export default function Stats({ stats, header }) {
  return (
    <FlatList
      data={stats}
      keyExtractor={(_, idx) => idx.toString()}
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
