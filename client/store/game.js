import axios from 'axios';

/**
 * INITIAL STATE
 */
// Tbh not sure if this is right, feel free to edit
const defaultGame = {
    gameStatus: 'countdown',
    round: {}
};


/**
 * ACTION TYPES
 */
const SET_GAME_STATUS = 'SET_GAME_STATUS';


/**
 * ACTION CREATORS
 */
const setGameStatus = gameStatus => ({ type: SET_GAME_STATUS, gameStatus });


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
  