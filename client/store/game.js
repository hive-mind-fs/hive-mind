import axios from 'axios';
import { BASE_URL } from '../utils/constants';

/**
 * INITIAL STATE
 */
const defaultGame = {
  practiceRound: {},
  userStats: {
    totalScore: '-',
    roundsPlayed: '-',
    wordsGotten: '-',
    graphPoints: []
  },
  leaderboard: []
};

/**
 * ACTION TYPES
 */
const SET_PRACTICE_ROUND = 'SET_PRACTICE_ROUND';
const SAVED_PRACTICE_ROUND = 'SAVED_PRACTICE_ROUND';
const GOT_USER_STATS = 'GOT_USER_STATS';
const GOT_LEADERBOARD = 'GOT_LEADERBOARD';

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

const gotLeaderboard = leaderboard => ({
  type: GOT_LEADERBOARD,
  leaderboard
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
    try {
      userStats = await axios.get(`${BASE_URL}/api/userRounds/${userId}`);
    } catch (error) {
      userStats = await axios.get(`/api/userRounds/${userId}`);
    }

    let response = userStats.data ? userStats.data : userStats;

    dispatch(gotUserStats(response));
  } catch (err) {
    console.error(err);
  }
};

export const getLeaderboard = () => async dispatch => {
  try {
    let leaderboard;

    try {
      leaderboard = await axios.get(`${BASE_URL}/api/userRounds/leaderboard`);
    } catch (error) {
      leaderboard = await axios.get(`/api/userRounds/leaderboard`);
    }
    dispatch(gotLeaderboard(leaderboard.data));
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
    case GOT_LEADERBOARD:
      return { ...state, leaderboard: action.leaderboard };
    default:
      return state;
  }
}
