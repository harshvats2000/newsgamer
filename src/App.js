import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import GamePage from "./components/GamePage";
import Login from "./components/Login";
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./components/Home";
import firebase from "./firebase";
import HowToPlay from "./components/HowToPlay";

const db = firebase.firestore();

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [availGames, setAvailGames] = useState([]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
        setLoading(false);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setLoading(false);
      }
    });
  }, [isAuthenticated]);

  useEffect(() => {
    let games = [];
    db.collection("games")
      .where("over", "==", false)
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          games.push(doc.data());
        });
        setAvailGames(games);
      });
  }, []);

  return (
    <div className="App">
      {loading ? (
        "loading..."
      ) : (
        <Switch>
          <PrivateRoute
            exact
            path="/"
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            availGames={availGames}
            user={user}
            component={Home}
          />

          <Route path="/login">
            <Login
              setUser={setUser}
              setIsAuthenticated={setIsAuthenticated}
              isAuthenticated={isAuthenticated}
            />
          </Route>

          <PrivateRoute
            path={`/game/:id`}
            isAuthenticated={isAuthenticated}
            user={user}
            component={GamePage}
          />

          <Route path="/how-to-play">
            <HowToPlay />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
