import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import firebase from "../firebase";
import { Link, withRouter } from "react-router-dom";

const db = firebase.firestore();

const Home = ({ history, user, setIsAuthenticated, availGames }) => {
  const [creatingGame, setCreatingGame] = useState(false);

  const createGame = (e) => {
    setCreatingGame(true);
    const id = uuidv4();
    db.collection("games")
      .doc(id)
      .set({
        players: [user.displayName],
        createdby: user.displayName,
        gameid: id,
        over: false,
        start: false,
      })
      .then(() => {
        setCreatingGame(false);
        history.push(`/game/${id}`);
      });
  };

  const logout = (e) => {
    firebase
      .auth()
      .signOut()
      .then(() => setIsAuthenticated(false));
  };

  return (
    <>
      <div style={{ fontSize: "2.5rem", textAlign: "center" }}>Newsgamer</div>
      <hr />
      <h2>Hello, {user && user.displayName}</h2>
      <button onClick={(e) => createGame(e)}>create new game</button>
      <button style={{ background: "red" }} onClick={logout}>
        Logout
      </button>

      {creatingGame ? "Creating new game..." : null}

      <div>
        {availGames.map((game, i) => (
          <div key={i}>
            1. <Link to={`/game/${game.gameid}`}>Game</Link> by {game.createdby}
          </div>
        ))}
      </div>
    </>
  );
};

export default withRouter(Home);
