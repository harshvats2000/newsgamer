import { firestore } from "firebase";
import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { content, max_score } from "../constants";
import firebase from "../firebase";
import Timer from "react-compound-timer";

const db = firebase.firestore();

const GamePage = ({ user, location }) => {
  const gameId = location.pathname.split("/")[2];
  const games_doc = db.collection("games").doc(gameId);
  const [currGame, setCurrGame] = useState({});
  const [words, setWords] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (gameOver) {
      games_doc.update({
        over: true,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver]);

  useEffect(() => {
    // Listen for live changes in the current game
    games_doc.onSnapshot((doc) => {
      setCurrGame(doc.data());
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      currGame.createdby &&
      !currGame.players.indexOf(user.displayName) !== -1
    ) {
      games_doc.update({
        players: firestore.FieldValue.arrayUnion(user.displayName),
      });
    }
  });

  useEffect(() => {
    games_doc.update({
      [user.displayName]: words.length,
    });

    if (words.length >= max_score) {
      games_doc
        .update({
          winner: user.displayName,
        })
        .then(() => setGameOver(true));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words]);

  const handleClick = (word_received, i) => {
    let word = word_received.trim();
    word = word_received.replace("”", "");
    word = word.replace("“", "");
    word = word.replace(",", "");

    // Check if the word is eligible
    if (word.toLowerCase().search(currGame.letter) === 0) {
      // If word is not in the list
      if (words.indexOf(word + i) === -1) {
        document.getElementById(`${word_received}${i}`).style.background =
          "yellow";
        setWords([...words, word + i]);
      } else {
        document.getElementById(`${word_received}${i}`).style.background =
          "gainsboro";
        let new_arr = words.filter((item) => item !== word + i);
        setWords(new_arr);
      }
    }
  };

  const startgame = () => {
    games_doc.update({
      start: true,
    });
  };

  return (
    <>
      {gameOver || currGame.over ? (
        <>
          <h1>Game Over</h1>
          <h3>Winner is {currGame.winner && currGame.winner}</h3>
          <div>
            {currGame.createdby &&
              currGame.players.map((player, i) => {
                return (
                  <div>
                    {player}: {currGame[player]}
                  </div>
                );
              })}
          </div>
          <Link to="/">Go back to home page</Link>
        </>
      ) : (
        <>
          <div
            style={{
              height: "120px",
              position: "fixed",
              top: 0,
              background: "white",
              width: "100vw",
              padding: "10px",
              boxShadow: "0 0 10px grey",
            }}
          >
            <div>
              Host:{" "}
              <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                {currGame.createdby}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                Click words starting with letter:{" "}
                <span style={{ fontSize: "1.4rem", fontWeight: "bold" }}>
                  {currGame.letter}
                </span>
              </div>
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  transform: "translate(-10px,2px)",
                  background: "black",
                  color: "white",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                <Timer startImmediately={currGame.start}>
                  <Timer.Minutes />: <Timer.Seconds />
                </Timer>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              {currGame.createdby &&
                currGame.players.map((player, i) => {
                  return (
                    <div
                      key={i}
                      style={{
                        color: user.displayName === player ? "green" : "red",
                      }}
                    >
                      <div>{player.split(" ")[0]}</div>
                      <div style={{ textAlign: "center", fontSize: "2rem" }}>
                        {currGame[player]}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {!currGame.start ? (
            <div style={{ marginTop: "130px" }}>
              {currGame.createdby === user.displayName ? (
                <>
                  <div
                    style={{
                      height: "100px",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <button onClick={startgame}>start game</button>
                  </div>
                  <div>
                    <p className="para" style={{ textAlign: "center" }}>
                      Clicking the button above will reveal the paragraph to
                      everyone and the game will start.
                    </p>
                    <p
                      className="para"
                      style={{ textAlign: "center", color: "red" }}
                    >
                      *Leaving this page will make your score 0.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <h2 style={{ paddingLeft: "10px" }}>
                    Game is not yet started by {currGame.createdby}.
                  </h2>
                  <p
                    className="para"
                    style={{ textAlign: "center", color: "red" }}
                  >
                    *Leaving this page will make your score 0.
                  </p>
                </>
              )}
            </div>
          ) : (
            <div className="newspaper">
              {content[currGame.paraindex].split(" ").map((word, i) => (
                <span key={i} style={{ whiteSpace: "initial" }}>
                  <span
                    id={`${word}${i}`}
                    onClick={(e) => handleClick(e.target.innerHTML, i)}
                  >
                    {word}
                  </span>{" "}
                </span>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default withRouter(GamePage);
