import axios from 'axios';
import { BASE_URL } from '../utils/constants';

/**
 * INITIAL STATE
 */
const defaultGame = {
  gameStatus: 'countdown',
  round: {},
  room: ''
};

/**
 * ACTION TYPES
 */
const SET_ROUND = 'SET_ROUND';
const SET_1V1_ROUND = 'SET_1V1_ROUND';
const SAVED_ROUND = 'SAVED_ROUND';
const SET_USER_ROOM = 'SET_ROOM';

/**
 * ACTION CREATORS
 */
const setRound = round => ({
  type: SET_ROUND,
  round
});

const set1v1Round = round => ({
  type: SET_1V1_ROUND,
  round
});

const savedRound = round => ({
  type: SAVED_ROUND,
  round
});

export const setUserRoom = room => ({
  type: SET_USER_ROOM,
  room
});

/**
 * THUNK CREATORS
 */
export const fetchRound = userId => async dispatch => {
  try {
    let round;
    try {
      round = await axios.post(`${BASE_URL}/api/userRounds/${userId}`);
    } catch (error) {
      round = await axios.post(`/api/userRounds/${userId}`);
    }
    dispatch(setRound(round.data));
  } catch (err) {
    console.error(err);
  }
};

export const fetch1v1Round = (userId, roundId) => async dispatch => {
  try {
    let round;
    try {
      round = await axios.post(
        `${BASE_URL}/api/userRounds/${userId}/${roundId}`
      );
    } catch (error) {
      round = await axios.post(`/api/userRounds/${userId}/${roundId}`);
    }
    console.log('round data in thunk', round.data);
    dispatch(set1v1Round(round.data));
  } catch (err) {
    console.error(err);
  }
};

export const saveRound = (
  roundId,
  score,
  correctWords,
  opId
) => async dispatch => {
  try {
    let round;
    console.log('in save roudn thunk', opId);
    try {
      round = await axios.put(`${BASE_URL}/api/userRounds/${roundId}`, {
        score: score,
        words: correctWords,
        opId: opId
      });
    } catch (error) {
      console.error(error);
    }
    dispatch(savedRound(round.data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultGame, action) {
  switch (action.type) {
    case SET_ROUND:
      return { ...state, round: action.round };
    case SET_USER_ROOM:
      return { ...state, room: action.room };
    case SET_1V1_ROUND:
      return { ...state, round: action.round };
    case SAVED_ROUND:
      return { ...state, round: action.round };
    default:
      return state;
  }
}
