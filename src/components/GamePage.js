import { firestore } from "firebase";
import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { content, max_score } from "../constants";
import firebase from "../firebase";
import { getRandomAlphabet } from "../functions/getRandomAlphabet";

const db = firebase.firestore();

const GamePage = ({ user, location }) => {
  const gameId = location.pathname.split("/")[2];
  const games_doc = db.collection("games").doc(gameId);
  const [currGame, setCurrGame] = useState({});
  const [words, setWords] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [alphabet, setAlphabet] = useState(null);
  const [changeAlphabet, setChangeAlphabet] = useState(true);

  useEffect(() => {
    let randomAlphabet = getRandomAlphabet();

    if (
      content[0].split(" ").map((word) => word.indexOf(randomAlphabet) === 0)
        .length >= max_score
    ) {
      games_doc.get().then((doc) => {
        if (!doc.data().alphabet) {
          console.log(gameId);
          games_doc
            .update({
              alphabet: randomAlphabet,
            })
            .then(() => {
              setAlphabet(randomAlphabet);
            });
        } else {
          setAlphabet(doc.data().alphabet);
        }
      });
    } else {
      setChangeAlphabet(!changeAlphabet);
    }
  }, [changeAlphabet]);

  useEffect(() => {
    if (gameOver) {
      games_doc.update({
        over: true,
      });
    }
  }, [gameOver]);

  useEffect(() => {
    // Listen for live changes in the current game
    games_doc.onSnapshot((doc) => {
      setCurrGame(doc.data());
    });
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
  }, [words]);

  const handleClick = (word, i) => {
    // Check if the word is eligible
    if (word.toLowerCase().search(alphabet) === 0) {
      // If word is not in the list
      if (words.indexOf(word + i) === -1) {
        document.getElementById(`${word}${i}`).style.background = "yellow";
        setWords([...words, word + i]);
      } else {
        document.getElementById(`${word}${i}`).style.background = "gainsboro";
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
              This game is created By {currGame.createdby && currGame.createdby}
              .
            </div>
            <div>
              Word:{" "}
              <span style={{ fontSize: "1.4rem" }}>{alphabet && alphabet}</span>
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
            <div style={{ marginTop: "120px" }}>
              {currGame.createdby === user.displayName ? (
                <div
                  style={{
                    height: "100px",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <button onClick={startgame}>start game</button>
                </div>
              ) : (
                <h2>Game is not started by {currGame.createdby} yet.</h2>
              )}
            </div>
          ) : (
            <div className="newspaper">
              {content[0].split(" ").map((word, i) => (
                <span key={i} style={{ whiteSpace: "initial" }}>
                  <span
                    id={`${word}${i}`}
                    onClick={(e) => handleClick(e.target.innerHTML.trim(), i)}
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
