import { FETCHING_GAMES_SUCCESS, FETCHING_GAMES } from ".";
import firebase from "../firebase";

const db = firebase.firestore();

export const fetchGames = () => async (dispatch) => {
  dispatch({
    type: FETCHING_GAMES,
    payload: true,
  });

  let games = [],
    refresh_icon = document.getElementById("refresh-icon");
  if (refresh_icon) {
    refresh_icon.classList.add("fa-spin");

    try {
      const snap = await db
        .collection("games")
        .orderBy("creationdate", "asc")
        .where("over", "==", false)
        .get();

      snap.forEach((doc) => {
        games.push(doc.data());
      });
      dispatch({
        type: FETCHING_GAMES_SUCCESS,
        payload: games,
      });
      document.getElementById("refresh-icon").classList.remove("fa-spin");
    } catch (error) {
      alert("Error in fetching games.");
    }
  }
};
