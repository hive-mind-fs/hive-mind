import React from 'react';
import { Thumbnail } from 'native-base';

export default function Logo() {
  return (
    <React.Fragment>
        <Thumbnail source={require('../assets/bee-logo.jpg')}/>
    </React.Fragment>
  );
}