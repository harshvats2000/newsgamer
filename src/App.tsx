import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import "./styles/bootstra-utilities.css";
import { Route, Switch } from "react-router-dom";
import { Loader } from "components";
import PrivateRoute from "./routes/PrivateRoute";
import { listenToAuthChanges, LOGGING_IN } from "actions";
import { Home } from "pages/Home";
import { Profile } from "pages/Profile";
import { GamePage } from "pages/GamePage";
import { Login } from "pages/Login";
import { HowToPlay } from "pages/HowToPlay";
import { RootState } from "store";

function App() {
  const authenticating = useSelector((state: RootState) => state.auth.authenticating);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOGGING_IN
    });

    dispatch(listenToAuthChanges());
  }, [dispatch]);

  return (
    <div className="App">
      {authenticating ? (
        <Loader />
      ) : (
        <Switch>
          <PrivateRoute exact path="/" component={Home} />

          <Route path="/login" component={Login} />

          <PrivateRoute path={`/game/:id`} component={GamePage} />

          <PrivateRoute path="/profile/me" component={Profile} />

          <Route path="/how-to-play" component={HowToPlay} />
        </Switch>
      )}
    </div>
  );
}

export default App;
