import React from "react";
import firebase from "../firebase";
import { Redirect, withRouter } from "react-router-dom";
import Header from "./Header";
import classes from "../styles/login.module.css";

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
      <Header />
      <div className={classes.body}>
        <button onClick={login}>Login with Google</button>
      </div>

      <div className={classes.footer}>
        Created with{" "}
        <svg
          className="heart"
          viewBox="0 0 32 29.6"
          style={{ width: "20px", height: "20px", verticalAlign: "bottom" }}
        >
          <path
            fill="red"
            d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
	c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
          />
        </svg>{" "}
        by{" "}
        <a
          href="https://github.com/harshvats2000"
          style={{
            color: "blue",
            fontWeight: "900",
            textDecoration: "underline",
          }}
        >
          Harsh Vats
        </a>
      </div>
    </div>
  );
};

export default withRouter(Login);
