import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { GamePage, Login, Home, HowToPlay, Loader, Profile } from "components";
import PrivateRoute from "./routes/PrivateRoute";
import { LOGGING_IN, listenToAuthChanges } from "actions";

function App() {
  const authenticating = useSelector((state) => state.auth.authenticating);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOGGING_IN
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(listenToAuthChanges());
  }, [dispatch]);

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
