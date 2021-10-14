import firebase from "../firebase";
import { LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGOUT_FAIL, LOGIN_FAIL, LOGGING_IN } from ".";

const auth = firebase.auth();
const db = firebase.firestore();

export const listenToAuthChanges = () => (dispatch) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: user,
      });
    } else {
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  });
};

export const login = () => async (dispatch) => {
  dispatch({
    type: LOGGING_IN,
  });
  var provider = new firebase.auth.GoogleAuthProvider();

  try {
    const res = await auth.signInWithPopup(provider);

    try {
      await db
        .collection("users")
        .doc(res.user.uid)
        .set({ displayName: res.user.displayName }, { merge: true });

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.user,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => async (dispatch) => {
  if (window.confirm("Are you sure you want to logout of NewsGamer?")) {
    try {
      await auth.signOut();
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: LOGOUT_FAIL,
      });
    }
  }
};
