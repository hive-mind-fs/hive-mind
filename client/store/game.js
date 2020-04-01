import axios from 'axios';
import { BASE_URL } from '../utils/constants';

/**
 * INITIAL STATE
 */
const defaultGame = {
  gameStatus: 'countdown',
  round: {}
};

/**
 * ACTION TYPES
 */
const SET_ROUND = 'SET_ROUND';
const SAVED_ROUND = 'SAVED_ROUND';

/**
 * ACTION CREATORS
 */
const setRound = round => ({
  type: SET_ROUND,
  round
});

const savedRound = round => ({
  type: SAVED_ROUND,
  round
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

export const fetch1v1Round = roundId => async dispatch => {
  try {
    let round;
    try {
      round = await axios.post(`${BASE_URL}/api/rounds/${roundId}`);
    } catch (error) {
      round = await axios.post(`/api/rounds/${roundId}`);
    }
    dispatch(setRound(round.data));
  } catch (err) {
    console.error(err);
  }
};

export const saveRound = (roundId, score, correctWords) => async dispatch => {
  try {
    let round;
    try {
      round = await axios.put(`${BASE_URL}/api/userRounds/${roundId}`, {
        score: score,
        words: correctWords
      });
    } catch (error) {
      console.error(err);
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
    case SAVED_ROUND:
      return { ...state, round: action.round };
    default:
      return state;
  }
}
