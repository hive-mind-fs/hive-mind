import React from 'react';
import { Thumbnail } from 'native-base';

const logo = require('../assets/bee-logo.jpg');

export default function Logo() {
  return (
    <React.Fragment>
        <Thumbnail source={{uri:logo}}/>
    </React.Fragment>
  );
}