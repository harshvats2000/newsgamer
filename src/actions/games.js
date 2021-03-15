import { FETCHING_GAMES_SUCCESS, FETCHING_GAMES, CREATING_GAME, DELETING_GAME } from ".";
import firebase from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { getRandomAlphabet } from "../functions/getRandomAlphabet";
import { content, max_score } from "../constants";

const db = firebase.firestore();

export const fetchGames = () => (dispatch) => {
  dispatch({
    type: FETCHING_GAMES,
    payload: true,
  });

  let games = [],
    refresh_icon = document.getElementById("refresh-icon");
  if (refresh_icon) {
    refresh_icon.classList.add("fa-spin");

    db.collection("games")
      .orderBy("creationdate", "asc")
      .where("over", "==", false)
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          games.push(doc.data());
        });
        dispatch({
          type: FETCHING_GAMES_SUCCESS,
          payload: games,
        });
        document.getElementById("refresh-icon").classList.remove("fa-spin");
      });
  }
};

export const createGame = (userName, history) => (dispatch) => {
  dispatch({
    type: CREATING_GAME,
    payload: true,
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
      over: false,
      start: false,
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
    payload: true,
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
