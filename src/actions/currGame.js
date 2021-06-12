import firebase from "../firebase";

export const addNewPlayerToCurrGame = (games_doc) => (dispatch, getState) => {
  const { displayName } = getState().auth.user;
  const currGame = getState().currGame.currGame;

  if (currGame.players.indexOf(displayName) === -1) {
    games_doc.get().then((doc) => {
      if (doc.data()) {
        doc.ref.update({
          players: firebase.firestore.FieldValue.arrayUnion(displayName),
          [displayName]: []
        });
      }
    });
  }
};

export const gameOver = (games_doc, winnerName) => () => {
  const { overdate, overtime } = getCurrentDateAndTime();

  games_doc.update({
    over: true,
    winner: winnerName,
    overdate,
    overtime
  });
};

const getCurrentDateAndTime = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  const overdate = dd + "/" + mm + "/" + yyyy;
  const overtime = today.getHours() + ":" + today.getMinutes();

  return { overdate, overtime };
};
