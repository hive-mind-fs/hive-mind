import axios from 'axios';
import { BASE_URL } from '../utils/constants';

/**
 * INITIAL STATE
 */
const defaultGame = {
  practiceRound: {},
  // userStats: {}
  userStats: {
    totalScore: '-',
    roundsPlayed: '-',
    wordsGotten: '-'
  }
};

/**
 * ACTION TYPES
 */
const SET_PRACTICE_ROUND = 'SET_PRACTICE_ROUND';
const SAVED_PRACTICE_ROUND = 'SAVED_PRACTICE_ROUND';
const GOT_USER_STATS = 'GOT_USER_STATS';

/**
 * ACTION CREATORS
 */
const setPracticeRound = practiceRound => ({
  type: SET_PRACTICE_ROUND,
  practiceRound
});

const savedPracticeRound = practiceRound => ({
  type: SAVED_PRACTICE_ROUND,
  practiceRound
});

const gotUserStats = userStats => ({
  type: GOT_USER_STATS,
  userStats
});

/**
 * THUNK CREATORS
 */
export const fetchPracticeRound = userId => async dispatch => {
  try {
    let practiceRound;
    try {
      practiceRound = await axios.post(`${BASE_URL}/api/userRounds/${userId}`);
    } catch (error) {
      practiceRound = await axios.post(`/api/userRounds/${userId}`);
    }
    dispatch(setPracticeRound(practiceRound.data));
  } catch (err) {
    console.error(err);
  }
};

export const savePracticeRound = (
  practiceRoundId,
  score,
  correctWords
) => async dispatch => {
  try {
    let practiceRound;
    try {
      practiceRound = await axios.put(
        `${BASE_URL}/api/userRounds/${practiceRoundId}`,
        {
          score: score,
          words: correctWords
        }
      );
    } catch (error) {
      console.error(err);
    }
    dispatch(savedPracticeRound(practiceRound.data));
  } catch (err) {
    console.error(err);
  }
};

export const getUserStats = userId => async dispatch => {
  try {
    let userStats;
    console.log('USER IDDD THUNKKKKKKK', userId);
    try {
      userStats = await axios.get(`${BASE_URL}/api/userRounds/${userId}`);
    } catch (error) {
      userStats = await axios.get(`/api/userRounds/${userId}`);
    }
    dispatch(gotUserStats(userStats.data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultGame, action) {
  switch (action.type) {
    case SET_PRACTICE_ROUND:
      return { ...state, practiceRound: action.practiceRound };
    case SAVED_PRACTICE_ROUND:
      return { ...state, practiceRound: action.practiceRound };
    case GOT_USER_STATS:
      return { ...state, userStats: action.userStats };
    default:
      return state;
  }
}
