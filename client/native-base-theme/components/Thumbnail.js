// @flow

export default () => {
  const thumbnailTheme = {
    '.square': {
      borderRadius: 0,
      '.small': {
        width: 36,
        height: 36,
        borderRadius: 0
      },
      '.large': {
        width: 80,
        height: 80,
        borderRadius: 0
      }
    },
    '.small': {
      width: 36,
      height: 36,
      borderRadius: 18,
      '.square': {
        borderRadius: 0
      }
    },
    '.large': {
      width: 80,
      height: 80,
      borderRadius: 40,
      '.square': {
        borderRadius: 0
      }
    },
    '.xlarge': {
      width: 120,
      height: 120,
      borderRadius: 40,
      '.square': {
        borderRadius: 0
      }
    },
    '.xxlarge': {
      width: 200,
      height: 200,
      borderRadius: 40,
      '.square': {
        borderRadius: 0
      }
    },
    '.center': {
      alignSelf: 'center'
    },
    width: 56,
    height: 56,
    borderRadius: 28
  };

  return thumbnailTheme;
};
