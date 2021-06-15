import firebase from "../firebase";
import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  LOGIN_FAIL,
  LOGGING_IN,
} from ".";

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

export const login = () => (dispatch) => {
  dispatch({
    type: LOGGING_IN,
  });
  var provider = new firebase.auth.GoogleAuthProvider();
  auth
    .signInWithPopup(provider)
    .then((res) => {
      db.collection("users")
        .doc(res.user.uid)
        .set(
          {
            displayName: res.user.displayName,
          },
          { merge: true }
        )
        .then(() => {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res.user,
          });
        })
        .catch((err) => {
          dispatch({
            type: LOGIN_FAIL,
          });
          console.log(err);
        });
    })
    .catch((err) =>
      dispatch({
        type: LOGIN_FAIL,
      })
    );
};

export const logout = () => (dispatch) => {
  if (window.confirm("Are you sure you want to logout of NewsGamer?")) {
    auth
      .signOut()
      .then(() =>
        dispatch({
          type: LOGOUT_SUCCESS,
        })
      )
      .catch((err) =>
        dispatch({
          type: LOGOUT_FAIL,
        })
      );
  }
};
