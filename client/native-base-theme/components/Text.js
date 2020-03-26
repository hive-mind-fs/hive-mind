// @flow

import variable from '../variables/platform';

export default (variables /* : * */ = variable) => {
  const textTheme = {
    fontSize: variables.DefaultFontSize,
    fontFamily: variables.fontFamily,
    color: variables.textColor,
    '.note': {
      color: '#a7a7a7',
      fontSize: variables.noteFontSize
    },
    '.center': {
      textAlign: 'center'
    },
    '.marginT5': {
      marginTop: 5
    },
    '.marginT10': {
      marginTop: 10
    }
  };

  return textTheme;
};
