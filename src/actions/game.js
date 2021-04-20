import firebase from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { getRandomAlphabet } from "../functions/getRandomAlphabet";
import { content, max_score } from "../constants";
import { CREATING_GAME, DELETING_GAME } from ".";
import { fetchGames } from "./games";

const db = firebase.firestore();

export const createGame = (userName, history) => (dispatch) => {
  dispatch({
    type: CREATING_GAME,
    payload: true
  });

  const paraIndex = Math.floor(Math.random() * content.length);
  let letter = generateLetter(paraIndex);
  const id = uuidv4();

  db.collection("games")
    .doc(id)
    .set({
      players: [userName],
      createdby: userName,
      gameid: id,
      letter: letter,
      paraindex: paraIndex,
      [userName]: [],
      creationdate: firebase.database.ServerValue.TIMESTAMP,
      createdAt: Date.now(),
      over: false,
      start: false
    })
    .then(() => history.push(`/game/${id}`));
};

const generateLetter = (paraIndex) => {
  let letter = getRandomAlphabet();

  // Check if paragraph contains enough words with alphabet
  let arr = content[paraIndex].split(" ").filter((word) => word.toLowerCase().indexOf(letter) === 0);

  if (arr.length >= max_score && arr.length <= max_score + 5) {
    return letter;
  } else {
    return generateLetter(paraIndex);
  }
};

export const deleteGame = (gameId) => (dispatch) => {
  dispatch({
    type: DELETING_GAME,
    payload: true
  });

  if (window.confirm("Are you sure you want to delete this game?")) {
    db.collection("games")
      .doc(gameId)
      .get()
      .then((doc) => {
        if (doc.data()) {
          doc.ref.delete().then(() => dispatch(fetchGames()));
        }
      });
  }
};
