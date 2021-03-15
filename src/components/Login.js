import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import Header from "./Header";
import classes from "../styles/login.module.css";
import { max_score } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/auth";

const Login = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div>
      {isAuthenticated ? <Redirect to="/" /> : null}
      <Header />
      <div>
        <div className={classes.body}>
          <div style={{ textAlign: "center", marginTop: "-150px" }}>
            <p className="para">
              Find and click <span style={{ fontWeight: 700, fontSize: "1.2rem" }}>{max_score}</span> words to win.
            </p>
            <div>
              <button className="btn btn-black" onClick={() => dispatch(login())}>
                Login with Google
              </button>
            </div>
          </div>
        </div>

        <div className={classes.footer}>
          Created with{" "}
          <svg className="heart" viewBox="0 0 32 29.6" style={{ width: "20px", height: "20px", verticalAlign: "bottom" }}>
            <path
              fill="red"
              d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
	c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
            />
          </svg>{" "}
          by{" "}
          <a
            href="https://www.harshvats.dev"
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
    </div>
  );
};

export default withRouter(Login);
