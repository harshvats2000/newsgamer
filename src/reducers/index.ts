import { combineReducers } from "redux";
import authReducer from "./auth";
import gamesReducer from "./games";
import gameReducer from "./game";

export default combineReducers({
  auth: authReducer,
  games: gamesReducer,
  game: gameReducer
});
