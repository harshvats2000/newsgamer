import { combineReducers } from "redux";
import authReducer from "./auth";
import gamesReducer from "./games";
import gameReducer from "./game";
// import currGameReducer from "./currGame";

export default combineReducers({
  auth: authReducer,
  games: gamesReducer,
  game: gameReducer
  // currGame: currGameReducer,
});
