import axios from 'axios';

// Action types
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

// Initial state
const defaultUser = {};

// Action creators
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

// Thunk creators
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me');
    dispatch(getUser(res.data || defaultUser));
  } catch (e) {
    console.error(e);
  }
};

export const auth = (email, password, method) => async dispatch => {
  let res;
  try {
    res = await axios.post(`/auth/${method}`, { email, password });
  } catch (e) {
    return dispatch(getUser({ error: e }));
  }

  try {
    dispatch(getUser(res.data));
  } catch (e) {
    console.error(e);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout');
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
