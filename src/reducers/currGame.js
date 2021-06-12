import { FETCHING_CURRENT_GAME, FETCHING_CURRENT_GAME_SUCCESS, RESET_CURRENT_GAME } from "actions";

const initialState = {
  currGame: null,
  fetchingGame: true
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case FETCHING_CURRENT_GAME:
      return {
        ...state,
        fetchingGame: true
      };

    case FETCHING_CURRENT_GAME_SUCCESS:
      return {
        ...state,
        fetchingGame: false,
        currGame: payload
      };

    case RESET_CURRENT_GAME:
      return {
        ...state,
        currGame: null,
        fetchingGame: false
      };

    default:
      return state;
  }
}
