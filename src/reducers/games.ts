import { AnyAction } from 'redux';
import { FETCHING_GAMES, FETCHING_GAMES_SUCCESS, FETCHING_GAMES_FAIL } from "actions";

const initialState = {
  availGames: [],
  fetchingGames: true
};

export default function (state = initialState,  {type, payload}: AnyAction) {  
  switch (type) {
    case FETCHING_GAMES:
      return {
        ...state,
        fetchingGames: payload
      };

    case FETCHING_GAMES_SUCCESS:
      return {
        ...state,
        availGames: payload,
        fetchingGames: false
      };

    case FETCHING_GAMES_FAIL:
      return {
        ...state,
        fetchingGames: false
      };

    default:
      return state;
  }
}
