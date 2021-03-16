import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import GamePage from "./components/GamePage";
import Login from "./components/Login";
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./components/Home";
import firebase from "./firebase";
import HowToPlay from "./components/HowToPlay";
import Loader from "./components/Loader";
import Profile from "./components/Profile";
import { LOGIN_SUCCESS, LOGIN_FAIL } from "./actions";

function App() {
  const authenticating = useSelector((state) => state.auth.authenticating);
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
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
  });

  return (
    <div className="App">
      {authenticating ? (
        <Loader />
      ) : (
        <Switch>
          <PrivateRoute exact path="/" component={Home} />

          <Route path="/login">
            <Login />
          </Route>

          <PrivateRoute path={`/game/:id`} component={GamePage} />

          <PrivateRoute path="/profile/me" component={Profile} />

          <Route path="/how-to-play">
            <HowToPlay />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
