import firebase from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { getRandomAlphabet } from "../functions/getRandomAlphabet";
import { content, max_score } from "../constants";
import {
  CREATING_GAME,
  DELETING_GAME,
  CREATING_GAME_SUCCESS,
  CREATING_GAME_FAIL,
} from ".";
import { fetchGames } from "./games";
import { FETCHING_CURRENT_GAME_SUCCESS, RESET_CURRENT_GAME } from "actions";

const db = firebase.firestore();

export const createGame = (history) => async (dispatch, getState) => {
  const { uid } = getState().auth.user;

  dispatch({
    type: CREATING_GAME,
  });

  const paraIndex = Math.floor(Math.random() * content.length);
  let letter = generateLetter(paraIndex);
  const id = uuidv4();

  const data = {
    players: [uid],
    createdby: uid,
    gameid: id,
    letter: letter,
    paraindex: paraIndex,
    [uid]: [],
    creationdate: firebase.database.ServerValue.TIMESTAMP,
    createdAt: Date.now(),
    over: false,
    start: false,
  };

  try {
    await db.collection("games").doc(id).set(data);
    dispatch({ type: CREATING_GAME_SUCCESS, payload: data });
    history.push(`/game/${id}`);
  } catch (error) {
    dispatch({ type: CREATING_GAME_FAIL, payload: data });
  }
};

const generateLetter = (paraIndex) => {
  let letter = getRandomAlphabet();

  // Check if paragraph contains enough words with alphabet
  let arr = content[paraIndex]
    .split(" ")
    .filter((word) => word.toLowerCase().indexOf(letter) === 0);

  if (arr.length >= max_score && arr.length <= max_score + 5) {
    return letter;
  } else {
    return generateLetter(paraIndex);
  }
};

export const deleteGame = (gameId) => async (dispatch) => {
  dispatch({
    type: DELETING_GAME,
    payload: true,
  });
  try {
    await db.collection("games").doc(gameId).delete();
    dispatch(fetchGames());
  } catch (error) {
    alert("Error in deleting game.");
  }
};

export const listenToRealTimeGameChanges =
  (games_doc) => (dispatch, getState) => {
    const { game } = getState().game;

    return games_doc.onSnapshot((doc) => {
      if (JSON.stringify(doc.data()) !== JSON.stringify(game)) {
        dispatch({ type: FETCHING_CURRENT_GAME_SUCCESS, payload: doc.data() });
      } else if (!doc.data()) {
        dispatch({ type: RESET_CURRENT_GAME });
      }
    });
  };

export const addNewPlayerToCurrGame =
  (games_doc) => async (dispatch, getState) => {
    const { uid } = getState().auth.user;
    const { game } = getState().game;

    if (game.players.indexOf(uid) === -1) {
      try {
        await games_doc.set(
          { players: firebase.firestore.FieldValue.arrayUnion(uid), [uid]: [] },
          { merge: true }
        );
      } catch (error) {
        alert("Error in adding new player to the game.");
      }
    }
  };

export const gameOver = (games_doc, winnerUid) => () => {
  const { overdate, overtime } = getCurrentDateAndTime();

  games_doc.update({
    over: true,
    winner: winnerUid,
    overdate,
    overtime,
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
