import { firestore } from "firebase";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { content } from "../constants";
import firebase from "../firebase";

const db = firebase.firestore();

const GamePage = ({ user, location }) => {
  const gameId = location.pathname.split("/")[2];
  const [currGame, setCurrGame] = useState({});
  const [words, setWords] = useState([]);
  const [word, setWord] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [alphabet, setAlphabet] = useState(null);

  useEffect(() => {
    var emptyString = "";
    var alphabet = "abcdefghijklmnopqrstuvwxyz";

    while (emptyString.length < 1) {
      emptyString += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    setAlphabet(emptyString);
  }, []);

  useEffect(() => {
    if (gameOver) {
      db.collection("games").doc(gameId).update({
        over: true,
      });
    }
  }, [gameOver]);

  useEffect(() => {
    // Listen for live changes in the current game
    db.collection("games")
      .doc(gameId)
      .onSnapshot((doc) => {
        setCurrGame(doc.data());
      });
  }, []);

  useEffect(() => {
    if (
      currGame.createdby &&
      !currGame.players.indexOf(user.displayName) !== -1
    ) {
      db.collection("games")
        .doc(gameId)
        .update({
          players: firestore.FieldValue.arrayUnion(user.displayName),
        });
    }
  });

  useEffect(() => {
    db.collection("games")
      .doc(gameId)
      .update({
        [user.displayName]: words.length,
      });

    if (words.length > 9) {
      db.collection("games")
        .doc(gameId)
        .update({
          winner: user.displayName,
        })
        .then(() => setGameOver(true));
    }
  }, [words]);

  const handleClick = (word, i) => {
    if (word.toLowerCase().search(alphabet) === 0) {
      setWord(word);
      if (words.indexOf(word) === -1) {
        document.getElementById(`${word}${i}`).style.background = "yellow";
        setWords([...words, word]);
      } else {
        document.getElementById(`${word}${i}`).style.background = "gainsboro";
        let new_arr = words.filter((item) => item !== word);
        setWords(new_arr);
      }
    }
  };

  return (
    <>
      {gameOver ? (
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
        </>
      ) : (
        <>
          <div>
            <div>
              This game is created By {currGame.createdby && currGame.createdby}
              .
            </div>
            <div>Word is {alphabet && alphabet}</div>
            <div>
              {currGame.createdby &&
                currGame.players.map((player, i) => {
                  return (
                    <div key={i}>
                      {player}: {currGame[player]}
                    </div>
                  );
                })}
            </div>
          </div>

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
        </>
      )}
    </>
  );
};

export default withRouter(GamePage);
