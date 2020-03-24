import axios from 'axios';
import { AsyncStorage } from 'react-native';

// Action types
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

// Initial state
const defaultUser = {};

// Action creators
export const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

const BASE_URL = 'http://localhost:8080';

// Thunk creators
export const me = () => async dispatch => {
  try {
    const res = await axios.get(`${BASE_URL}/auth/me`);
    dispatch(getUser(res.data || defaultUser));
  } catch (e) {
    console.error(e);
  }
};

export const auth = (email, password, method) => async dispatch => {
  let res;
  try {
    res = await axios.post(`${BASE_URL}/auth/${method}`, {
      email,
      password
    });
  } catch (e) {
    return dispatch(getUser({ error: e }));
  }

  try {
    dispatch(getUser(res.data));
    await AsyncStorage.setItem('user', JSON.stringify(res.data));
  } catch (e) {
    console.error(e);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post(`${BASE_URL}/auth/logout`);
    await AsyncStorage.setItem('user', null);
    dispatch(removeUser());
  } catch (e) {
    console.error(e);
  }
};

// Reducer
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}
