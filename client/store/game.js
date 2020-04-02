import axios from 'axios';
import { BASE_URL } from '../utils/constants';

/**
 * INITIAL STATE
 */
const defaultGame = {
  gameStatus: 'countdown',
  practiceRound: {}
};

/**
 * ACTION TYPES
 */
const SET_PRACTICE_ROUND = 'SET_PRACTICE_ROUND';
const SAVED_PRACTICE_ROUND = 'SAVED_PRACTICE_ROUND';

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

/**
 * THUNK CREATORS
 */
export const fetchPracticeRound = () => async dispatch => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/puzzle/random`);
    dispatch(setPracticeRound(data));
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

/**
 * REDUCER
 */
export default function(state = defaultGame, action) {
  switch (action.type) {
    case SET_PRACTICE_ROUND:
      return { ...state, practiceRound: action.practiceRound };
    case SAVED_PRACTICE_ROUND:
      return { ...state, practiceRound: action.practiceRound };
    default:
      return state;
  }
}
