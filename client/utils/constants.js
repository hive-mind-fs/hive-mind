import Constants from 'expo-constants';

export const BASE_URL =
  Constants.manifest.releaseChannel === 'prod'
    ? 'https://hivemind-fs.herokuapp.com'
    : 'http://localhost:8080';
