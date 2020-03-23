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
const SET_GAME_STATUS = 'SET_GAME_STATUS';
const SET_PRACTICE_ROUND = 'SET_PRACTICE_ROUND';

/**
 * ACTION CREATORS
 */
const setGameStatus = gameStatus => ({ type: SET_GAME_STATUS, gameStatus });

const setPracticeRound = practiceRound => ({
  type: SET_PRACTICE_ROUND,
  practiceRound
});

/**
 * THUNK CREATORS
 */
export const setGameStatusThunk = gameStatus => async dispatch => {
  try {
    dispatch(setGameStatus);
  } catch (err) {
    console.error(err);
  }
};

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

/**
 * REDUCER
 */
export default function(state = defaultGame, action) {
  switch (action.type) {
    case SET_PRACTICE_ROUND:
      console.log('STATE PRACTICE', { ...state, practiceRound: action.practiceRound})
      return { ...state, practiceRound: action.practiceRound};
    default:
      return state;
  }
}
