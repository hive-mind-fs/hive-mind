import axios from 'axios';

// I just setup the outline. Need to talk through actual defaultState and actions to see what's best.

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
const SET_GAME_STATUS = 'SET_GAME_STATUS';
const START_ROUND = 'GET_ROUND';

/**
 * ACTION CREATORS
 */
const setGameStatus = gameStatus => ({ type: SET_GAME_STATUS, gameStatus });

const startRound = round => ({ type: START_ROUND, round })

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

export const startRoundThunk = () => async dispatch => {
  try {
      dispatch(startRound);
  } catch (err) {
      console.error(err);
  }
};


/**
 * REDUCER
 */
export default function(state = defaultGame, action) {
    switch (action.type) {
      case SET_GAME_STATUS:
        return {...state}, action.gameStatus;
      default:
        return state;
    }
  }
  