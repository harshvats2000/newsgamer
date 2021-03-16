import { FETCHING_CURR_GAME } from ".";
import firebase from "../firebase";
import { max_score } from "../constants";

const db = firebase.firestore();

// export const fetchGame = () => (dispatch) => {
//   dispatch({
//     type: FETCHING_CURR_GAME,
//     payload: true,
//   });
// };

export const addNewPlayerToCurrGame = (games_doc) => (dispatch, getState) => {
  const { displayName } = getState().auth.user;
  const currGame = getState().currGame.currGame;

  // If any new player comes, add him to game
  if (currGame.players.indexOf(displayName) === -1) {
    games_doc.get().then((doc) => {
      if (doc.data()) {
        doc.ref.update({
          players: firebase.firestore.FieldValue.arrayUnion(displayName),
          [displayName]: [],
        });
      }
    });
  }
};

export const addWinner = (games_doc) => (dispatch, getState) => {
  const currGame = getState().currGame.currGame;
  currGame.players.map((player) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    var overdate = dd + "/" + mm + "/" + yyyy;
    var overtime = today.getHours() + ":" + today.getMinutes();
    if (currGame[player].length >= max_score) {
      games_doc.update({
        over: true,
        winner: player,
        overdate: overdate,
        overtime: overtime,
      });
    }
  });
};
