import {
  CREATING_GAME,
  CREATING_GAME_SUCCESS,
  CREATING_GAME_FAIL,
  FETCHING_CURRENT_GAME,
  FETCHING_CURRENT_GAME_SUCCESS,
  RESET_CURRENT_GAME,
  UPDATING_SCORE,
  UPDATING_SCORE_FAIL,
  UPDATING_SCORE_SUCCESS,
} from "actions";
import { GameInterface } from "interfaces";
import { AnyAction } from "redux";

interface stateProps {
  game: GameInterface | null;
  creatingGame: boolean;
  fetchingGame: boolean;
  updating: boolean;
}

const initialState: stateProps = {
  game: null,
  creatingGame: false,
  fetchingGame: true,
  updating: false,
};

export default function (state = initialState, { type, payload }: AnyAction) {
  switch (type) {
    case CREATING_GAME:
      return {
        ...state,
        creatingGame: true,
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
        game: null,
      };

    case FETCHING_CURRENT_GAME:
      return {
        ...state,
        fetchingGame: true,
      };

    case FETCHING_CURRENT_GAME_SUCCESS:
      return {
        ...state,
        fetchingGame: false,
        game: payload,
      };

    case RESET_CURRENT_GAME:
      return {
        ...state,
        game: null,
        fetchingGame: false,
      };

    case UPDATING_SCORE:
      return {
        ...state,
        updating: true,
      };

    case UPDATING_SCORE_SUCCESS:
      return {
        ...state,
        updating: false,
      };

    case UPDATING_SCORE_FAIL:
      return {
        ...state,
        updating: false,
      };

    default:
      return state;
  }
}
