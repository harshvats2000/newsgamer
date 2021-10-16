import firebase from "../firebase";
import { LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGOUT_FAIL, LOGIN_FAIL, LOGGING_IN } from ".";

const auth = firebase.auth();
const db = firebase.firestore();

export const listenToAuthChanges = () => (dispatch) => {
  auth.onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
      const user = {
        displayName: firebaseUser.displayName,
        uid: firebaseUser.uid,
        photoURL: firebaseUser.photoURL,
        email: firebaseUser.email,
      };
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
      const user = {
        displayName: res.user.displayName,
        uid: res.user.uid,
        photoURL: res.user.photoURL,
        email: res.user.email,
      };

      await db.collection("users").doc(res.user.uid).set(user, { merge: true });

      dispatch({
        type: LOGIN_SUCCESS,
        payload: user,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  } catch (error) {
    console.error(error);
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
      console.error(error);
      dispatch({
        type: LOGOUT_FAIL,
      });
    }
  }
};
