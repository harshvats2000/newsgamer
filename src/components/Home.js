import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import firebase from "../firebase";
import { Link, withRouter } from "react-router-dom";
import Header from "./Header";
import { getRandomAlphabet } from "../functions/getRandomAlphabet";
import { content, max_score } from "../constants";

const db = firebase.firestore();

const paraIndex = Math.floor(Math.random() * content.length);

const Home = ({
  history,
  user,
  setIsAuthenticated,
  availGames,
  updateGames,
}) => {
  const [creatingGame, setCreatingGame] = useState(false);

  const generateLetter = () => {
    let letter = getRandomAlphabet();

    // Check if paragraph contains enough words with alphabet
    let arr = content[paraIndex]
      .split(" ")
      .filter((word) => word.indexOf(letter) === 0);

    if (arr.length >= max_score) {
      return letter;
    } else {
      generateLetter();
    }
  };

  const createGame = (e) => {
    setCreatingGame(true);

    let letter = generateLetter();

    const id = uuidv4();
    db.collection("games")
      .doc(id)
      .set({
        players: [user.displayName],
        createdby: user.displayName,
        gameid: id,
        letter: letter,
        paraindex: paraIndex,
        over: false,
        start: false,
      })
      .then(() => {
        setCreatingGame(false);
        history.push(`/game/${id}`);
      });
  };

  const deleteGame = (gameid) => {
    if (window.confirm("Are you sure you want to delete this game?")) {
      db.collection("games")
        .doc(gameid)
        .delete()
        .then(() => updateGames());
    }
  };

  const logout = (e) => {
    if (window.confirm("Are you sure you want to logout of NewsGamer?")) {
      firebase
        .auth()
        .signOut()
        .then(() => setIsAuthenticated(false));
    }
  };

  return (
    <>
      <Header />

      <div style={{ padding: "10px" }}>
        <h2>
          Hello,{" "}
          <span style={{ color: "green" }}>{user && user.displayName}</span>
        </h2>
        <button onClick={(e) => createGame(e)}>create new game</button>
        <button style={{ background: "red" }} onClick={logout}>
          Logout
        </button>
      </div>

      {creatingGame ? "Creating new game..." : null}

      <hr />

      <div style={{ marginTop: "20px", fontSize: "1.4rem", padding: "10px" }}>
        {availGames.map((game, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <div>
              {i + 1}.{" "}
              <Link
                to={`/game/${game.gameid}`}
                style={{ color: "blue", textDecoration: "underline" }}
              >
                Game
              </Link>{" "}
              by {game.createdby}.
            </div>
            {game.createdby === user.displayName ? (
              <div style={{ marginRight: "10px" }}>
                <i
                  className="fa fa-trash"
                  style={{ color: "red" }}
                  onClick={(e) => deleteGame(game.gameid)}
                />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </>
  );
};

export default withRouter(Home);
