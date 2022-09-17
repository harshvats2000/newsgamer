import firebase from "../firebase";
import { LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGOUT_FAIL, LOGIN_FAIL, LOGGING_IN } from ".";
import { UserInterface } from "../interfaces";
import { Dispatch } from "redux";

const auth = firebase.auth();
const db = firebase.firestore();

export const listenToAuthChanges = () => (dispatch: Dispatch) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      let temp: UserInterface = {
        displayName: user.displayName!,
        uid: user.uid!,
        email: user.email!,
        creation_time: user.metadata.creationTime!,
        lastSignInTime: user.metadata.lastSignInTime!,
        photoURL: user.photoURL!
      };
      dispatch({
        type: LOGIN_SUCCESS,
        payload: temp
      });
    } else {
      dispatch({
        type: LOGIN_FAIL
      });
    }
  });
};

export const login = () => async (dispatch: Dispatch) => {
  dispatch({
    type: LOGGING_IN
  });

  var provider = new firebase.auth.GoogleAuthProvider();

  try {
    const res = await auth.signInWithPopup(provider);

    if (res.user) {
      const user: UserInterface = {
        displayName: res.user.displayName!,
        uid: res.user.uid!,
        email: res.user.email!,
        creation_time: res.user.metadata.creationTime!,
        lastSignInTime: res.user.metadata.lastSignInTime!,
        photoURL: res.user.photoURL!
      };

      try {
        await db.collection("users").doc(res.user.uid).set(user, { merge: true });

        dispatch({
          type: LOGIN_SUCCESS,
          payload: user
        });
      } catch (error) {
        dispatch({
          type: LOGIN_FAIL
        });
      }
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const logout = () => async (dispatch: Dispatch) => {
  if (window.confirm("Are you sure you want to logout of NewsGamer?")) {
    try {
      await auth.signOut();
      dispatch({
        type: LOGOUT_SUCCESS
      });
    } catch (error) {
      dispatch({
        type: LOGOUT_FAIL
      });
    }
  }
};
