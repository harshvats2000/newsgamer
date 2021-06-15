import {
  CREATING_GAME,
  CREATING_GAME_SUCCESS,
  CREATING_GAME_FAIL,
  FETCHING_CURRENT_GAME,
  FETCHING_CURRENT_GAME_SUCCESS,
  RESET_CURRENT_GAME
} from "actions";

const initialState = {
  game: null,
  creatingGame: false,
  fetchingGame: true
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case CREATING_GAME:
      return {
        ...state,
        creatingGame: true
      };

    case CREATING_GAME_SUCCESS:
      return {
        ...state,
        game: payload,
        creatingGame: false
      };

    case CREATING_GAME_FAIL:
      return {
        ...state,
        creatingGame: false,
        game: null
      };

    case FETCHING_CURRENT_GAME:
      return {
        ...state,
        fetchingGame: true
      };

    case FETCHING_CURRENT_GAME_SUCCESS:
      return {
        ...state,
        fetchingGame: false,
        game: payload
      };

    case RESET_CURRENT_GAME:
      return {
        ...state,
        game: null,
        fetchingGame: false
      };

    default:
      return state;
  }
}
