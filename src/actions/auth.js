import firebase from "../firebase";
import { LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGOUT_FAIL, LOGIN_FAIL, FETCHING_USER } from ".";

const auth = firebase.auth();

export const login = () => (dispatch) => {
  dispatch({
    type: FETCHING_USER,
    payload: true,
  });
  var provider = new firebase.auth.GoogleAuthProvider();
  auth
    .signInWithPopup(provider)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.user,
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
