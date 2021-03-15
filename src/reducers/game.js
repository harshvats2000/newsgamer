import { CREATING_GAME, CREATING_GAME_SUCCESS, CREATING_GAME_FAIL } from "../actions";

const initialState = {
  game: null,
  creatingGame: false,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case CREATING_GAME:
      return {
        ...state,
        creatingGame: payload,
      };

    case CREATING_GAME_SUCCESS:
      return {
        ...state,
        game: payload,
        creatingGame: false,
      };

    case CREATING_GAME_FAIL:
      return {
        ...state,
        creatingGame: false,
      };

    default:
      return state;
  }
}
