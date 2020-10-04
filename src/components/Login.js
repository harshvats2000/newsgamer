import React from "react";
import firebase from "../firebase";
import { Redirect, withRouter } from "react-router-dom";

const db = firebase.firestore();
const auth = firebase.auth();

const Login = ({ setUser, setIsAuthenticated, isAuthenticated }) => {
  const login = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then((res) => {
      setUser(res.user);
      setIsAuthenticated(true);
    });
  };

  return (
    <div>
      {isAuthenticated ? <Redirect to="/" /> : null}
      <button onClick={login}>Login with Googlle</button>
    </div>
  );
};

export default withRouter(Login);
