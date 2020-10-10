import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import firebase from "../firebase";
import { Link, withRouter } from "react-router-dom";
import Header from "./Header";
import { getRandomAlphabet } from "../functions/getRandomAlphabet";
import { content, max_score } from "../constants";
import classes from "../styles/home.module.css";
import Loader from "../components/Loader";

const db = firebase.firestore();

const paraIndex = Math.floor(Math.random() * content.length);

const Home = ({ history, user, setIsAuthenticated }) => {
  const [creatingGame, setCreatingGame] = useState(false);
  const [availGames, setAvailGames] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchGames();

    // Set interval to update games in every 5s
    // setInterval(fetchGames, 5000);
  }, []);

  const fetchGames = () => {
    let games = [];
    let refresh_icon = document.getElementById("refresh-icon");
    if (refresh_icon) {
      refresh_icon.classList.add("fa-spin");

      db.collection("games")
        .orderBy("creationdate", "asc")
        .where("over", "==", false)
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            games.push(doc.data());
          });
          setAvailGames(games);
          setLoading(false);
          document.getElementById("refresh-icon").classList.remove("fa-spin");
        });
    }
  };

  const generateLetter = () => {
    let letter = getRandomAlphabet();

    // Check if paragraph contains enough words with alphabet
    let arr = content[paraIndex]
      .split(" ")
      .filter((word) => word.indexOf(letter) === 0);

    if (arr.length >= max_score) {
      return letter;
    } else {
      return generateLetter();
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
        creationdate: firebase.database.ServerValue.TIMESTAMP,
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
        .get()
        .then((doc) => {
          if (doc.data()) {
            doc.ref.delete().then(() => fetchGames());
          }
        });
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
          <span style={{ color: "green", textTransform: "capitalize" }}>
            {user && user.displayName}
          </span>
        </h2>
        <button onClick={(e) => createGame(e)}>
          <i className="fa fa-plus btn-icon" />
          create new game
        </button>
        <button style={{ background: "red" }} onClick={logout}>
          <i className="fa fa-sign-out btn-icon" />
          Logout
        </button>
      </div>

      {creatingGame ? <Loader /> : null}

      <hr />

      <div className={classes.refresh}>
        <div style={{ fontSize: "0.8rem" }}>
          The games are updated every{" "}
          <span style={{ fontWeight: 900, verticalAlign: "middle" }}>5</span>{" "}
          seconds.
        </div>
        <i
          className="fa fa-refresh"
          id="refresh-icon"
          onClick={(e) => fetchGames()}
        />
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div
          style={{
            marginTop: "5px",
            padding: "20px 10px 10px",
            fontSize: "1.2rem",
            background: "gainsboro",
          }}
        >
          {availGames.length === 0 ? (
            <p className="para">No games are being played right now.</p>
          ) : null}
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
                {i + 1}. Join{" "}
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
      )}
    </>
  );
};

export default withRouter(Home);
