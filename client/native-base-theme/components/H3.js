// @flow

import variable from '../variables/platform';

export default (variables /* : * */ = variable) => {
  const h3Theme = {
    color: variables.textColor,
    fontSize: variables.fontSizeH3,
    lineHeight: variables.lineHeightH3,
    '.center': {
      textAlign: 'center'
    },
    '.marginT5': {
      marginTop: 5
    },
    '.marginT10': {
      marginTop: 10
    },
    '.marginT20': {
      marginTop: 20
    }
  };

  return h3Theme;
};
