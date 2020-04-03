// @flow

import variable from '../variables/platform';

export default (variables /* : * */ = variable) => {
  const h1Theme = {
    color: variables.textColor,
    fontSize: variables.fontSizeH1,
    lineHeight: variables.lineHeightH1,
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

  return h1Theme;
};
