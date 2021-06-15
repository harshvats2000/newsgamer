// import firebase from "../firebase";
// import { FETCHING_CURRENT_GAME_SUCCESS, RESET_CURRENT_GAME } from "actions";

// export const listenToRealTimeGameChanges = (games_doc) => (dispatch, getState) => {
//   const { currGame } = getState().currGame;

//   games_doc.onSnapshot((doc) => {
//     if (JSON.stringify(doc.data()) !== JSON.stringify(currGame)) {
//       dispatch({ type: FETCHING_CURRENT_GAME_SUCCESS, payload: doc.data() });
//     } else if (!doc.data()) {
//       dispatch({ type: RESET_CURRENT_GAME });
//     }
//   });
// };

// export const addNewPlayerToCurrGame = (games_doc) => (dispatch, getState) => {
//   const { displayName } = getState().auth.user;
//   const currGame = getState().currGame.currGame;

//   if (currGame.players.indexOf(displayName) === -1) {
//     games_doc.get().then((doc) => {
//       if (doc.data()) {
//         doc.ref.update({
//           players: firebase.firestore.FieldValue.arrayUnion(displayName),
//           [displayName]: []
//         });
//       }
//     });
//   }
// };

// export const gameOver = (games_doc, winnerName) => () => {
//   const { overdate, overtime } = getCurrentDateAndTime();

//   games_doc.update({
//     over: true,
//     winner: winnerName,
//     overdate,
//     overtime
//   });
// };

// const getCurrentDateAndTime = () => {
//   var today = new Date();
//   var dd = String(today.getDate()).padStart(2, "0");
//   var mm = String(today.getMonth() + 1).padStart(2, "0");
//   var yyyy = today.getFullYear();

//   const overdate = dd + "/" + mm + "/" + yyyy;
//   const overtime = today.getHours() + ":" + today.getMinutes();

//   return { overdate, overtime };
// };
