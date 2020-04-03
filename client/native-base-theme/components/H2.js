// @flow

import variable from '../variables/platform';

export default (variables /* : * */ = variable) => {
  const h2Theme = {
    color: variables.textColor,
    fontSize: variables.fontSizeH2,
    lineHeight: variables.lineHeightH2,
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

  return h2Theme;
};
