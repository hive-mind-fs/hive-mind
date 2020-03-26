// @flow

import { Platform, Dimensions } from 'react-native';

import variable from '../variables/platform';
import { PLATFORM } from '../variables/commonColor';

const deviceHeight = Dimensions.get('window').height;
export default (variables /* : * */ = variable) => {
  const theme = {
    display: 'flex',
    height: Platform.OS === PLATFORM.IOS ? deviceHeight : deviceHeight - 20,
    backgroundColor: variables.containerBgColor,
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 20,
    textAlign: 'center',
    '.form': {
      alignItems: 'none',
      justifyContent: 'none',
      textAlign: 'left',
      display: 'block'
    },
  };

  return theme;
};
