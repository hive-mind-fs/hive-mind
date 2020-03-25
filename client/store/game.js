import axios from 'axios';

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
export const fetchPracticeRound = userId => async dispatch => {
  try {
    let practiceRound;
    try {
      practiceRound = await axios.post(`http://localhost:8080/api/userRounds/${userId}`);
    } catch (error) {
      practiceRound = await axios.post(`/api/userRounds/${userId}`);
    }
    dispatch(setPracticeRound(practiceRound.data));
  } catch (err) {
    console.error(err);
  }
};

export const savePracticeRound = (practiceRoundId, score, correctWords) => async dispatch => {
  try {
    let practiceRound;
    try {
      practiceRound = await axios.put(`http://localhost:8080/api/userRounds/${practiceRoundId}`, {
        score: score,
        words: correctWords
      });
    } catch (error) {
      practiceRound = await axios.put(`/api/userRounds/${practiceRoundId}`, {
        score: score,
        words: correctWords
      });
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
