import React from 'react';
import { Thumbnail } from 'native-base';

export default function Logo() {
  return (
    <React.Fragment>
        <Thumbnail xlarge source={require('../assets/bee-logo-square.png')}/>
    </React.Fragment>
  );
}