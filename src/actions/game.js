import firebase from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { content, POINTS_ON_WIN } from "../constants";
import {
  CREATING_GAME,
  CREATING_GAME_SUCCESS,
  CREATING_GAME_FAIL,
  UPDATING_SCORE,
  UPDATING_SCORE_FAIL,
  UPDATING_SCORE_SUCCESS,
  FETCHING_CURRENT_GAME,
  FETCHING_GAME_CHATS_SUCCESS,
} from ".";
import { fetchGames } from "./games";
import { FETCHING_CURRENT_GAME_SUCCESS, RESET_CURRENT_GAME } from "actions";
import { generateLetter } from "helpers";
import { getCurrentDateAndTime } from "helpers";
import moment from "moment";
import { orderBy, values } from "lodash";
import { catchAsync } from "utils";

const db = firebase.firestore();

const gamesRef = db.collection("games");

const createGame = (history) => async (dispatch, getState) => {
  const { uid, displayName } = getState().auth.user;

  dispatch({
    type: CREATING_GAME,
  });

  const paraIndex = Math.floor(Math.random() * content.length);
  let letter = generateLetter(paraIndex);
  const id = uuidv4();

  const data = {
    players: { [uid]: { name: displayName, uid, words: [] } },
    createdBy: { uid, name: displayName },
    gameId: id,
    letter: letter,
    paraIndex: paraIndex,
    creationdate: firebase.database.ServerValue.TIMESTAMP,
    createdAt: Date.now(),
    over: false,
    start: false,
  };

  try {
    await gamesRef.doc(id).set(data);
    dispatch({ type: CREATING_GAME_SUCCESS, payload: data });
    history.push(`/game/${id}`);
  } catch (error) {
    console.error(error);
    dispatch({ type: CREATING_GAME_FAIL, payload: data });
  }
};

const deleteGame = (gameId) =>
  catchAsync(async (dispatch) => {
    const game_doc = gamesRef.doc(gameId);
    const chat_doc = game_doc.collection("chats").doc("1");

    await game_doc.delete();
    await chat_doc.delete();
    dispatch(fetchGames());
  }, "error in deleting game.");

const listenToRealTimeGameChanges = (gameId) => (dispatch, getState) => {
  dispatch({ type: FETCHING_CURRENT_GAME });

  const game_doc = gamesRef.doc(gameId);

  return game_doc.onSnapshot((doc) => {
    if (doc.exists) {
      dispatch({ type: FETCHING_CURRENT_GAME_SUCCESS, payload: doc.data() });
    } else {
      console.error("game document does not exist.");
      dispatch({ type: RESET_CURRENT_GAME });
    }
  });
};

const updateScore = (words) => async (dispatch, getState) => {
  dispatch({ type: UPDATING_SCORE });

  const { game } = getState().game;
  const game_doc = gamesRef.doc(game.gameId);
  const { uid } = getState().auth.user;

  try {
    await game_doc.update({ [`players.${uid}.words`]: words });
    dispatch({
      type: UPDATING_SCORE_SUCCESS,
    });
  } catch (error) {
    console.error(error);

    dispatch({ type: UPDATING_SCORE_FAIL });
  }
};

const addNewPlayerToCurrGame = (gameId) =>
  catchAsync(async (dispatch, getState) => {
    const game_doc = gamesRef.doc(gameId);
    const { uid, displayName } = await getState().auth.user;

    await game_doc.update({
      [`players.${uid}`]: { name: displayName, uid, words: [] },
    });
  }, "error in adding new player to game.");

const gameOver = (gameId, winner) =>
  catchAsync(async (dispatch, getState) => {
    const game_doc = gamesRef.doc(gameId);
    const { overdate, overtime } = getCurrentDateAndTime();

    await game_doc.update({
      over: true,
      winner,
      overdate,
      overtime,
    });

    const { user } = getState().auth;
    await db
      .collection("users")
      .doc(user.uid)
      .update({
        points: firebase.firestore.FieldValue.increment(POINTS_ON_WIN),
      });
  }, "error in ending game.");

const sendChatMessage = (msg) => async (dispatch, getState) => {
  const {
    game: { gameId },
  } = getState().game;
  const chat_doc = gamesRef.doc(gameId).collection("chats").doc("1");
  const { uid, displayName } = getState().auth.user;

  try {
    const currTime = moment().format();
    await chat_doc.set(
      {
        [currTime]: {
          uid,
          displayName,
          postedAt: currTime,
          msg,
        },
      },
      { merge: true }
    );
  } catch (error) {
    console.error(error, "error in send message.");
  }
};

const listenToChats = () => (dispatch, getState) => {
  const {
    game: { gameId },
  } = getState().game;
  const chat_doc = gamesRef.doc(gameId).collection("chats").doc("1");

  return chat_doc.onSnapshot((doc) => {
    if (doc && doc.exists) {
      const chats = orderBy(values(doc.data()), ["postedAt"], ["asc"]).map((d) => ({
        uid: d.uid,
        displayName: d.displayName,
        postedAt: d.postedAt,
        msg: d.msg,
      }));
      dispatch({ type: FETCHING_GAME_CHATS_SUCCESS, payload: chats });
    } else {
      console.error("chat document does not exist.");
    }
  });
};

export {
  createGame,
  deleteGame,
  updateScore,
  listenToRealTimeGameChanges,
  addNewPlayerToCurrGame,
  gameOver,
  sendChatMessage,
  listenToChats,
};
