import { FETCHING_CURR_GAME, SET_CURR_GAME } from "actions";

const initialState = {
  currGame: null,
  fetchingGame: true
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case FETCHING_CURR_GAME:
      return {
        ...state,
        fetchingGame: payload
      };

    case SET_CURR_GAME:
      return {
        ...state,
        currGame: payload,
        fetchingGame: false
      };

    default:
      return state;
  }
}
