import { firestore } from "firebase";
import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { content, max_score } from "../constants";
import firebase from "../firebase";
import Timer from "react-compound-timer";
import classes from "../styles/gamepage.module.css";
import Loader from "../components/Loader";
import { useSpring, animated } from "react-spring";

const db = firebase.firestore();

const GamePage = ({ user, location }) => {
  const gameId = location.pathname.split("/")[2];
  const games_doc = db.collection("games").doc(gameId);
  const [currGame, setCurrGame] = useState({});
  const [words, setWords] = useState([]);
  const [fetching, setFeching] = useState(true);

  useEffect(() => {
    // Listen for live changes in the current game
    games_doc.onSnapshot((doc) => {
      if (doc.data()) {
        setCurrGame(doc.data());
      } else {
        setCurrGame({});
      }
      if (fetching) setFeching(false);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If any new player comes, add him to game
  useEffect(() => {
    if (
      currGame.createdby &&
      !currGame.players.indexOf(user.displayName) !== -1
    ) {
      games_doc.get().then((doc) => {
        if (doc.data()) {
          doc.ref.update({
            players: firestore.FieldValue.arrayUnion(user.displayName),
          });
        }
      });
    }
  }, [currGame]);

  useEffect(() => {
    games_doc.get().then((doc) => {
      if (doc.data()) {
        doc.ref.update({
          [user.displayName]: words.length,
        });
      }
    });

    if (words.length >= max_score) {
      games_doc.get().then((doc) => {
        console.log(doc.data());
        if (doc.data()) {
          doc.ref
            .update({
              winner: user.displayName,
            })
            .then(() => {
              doc.data() && doc.ref.update({ over: true });
            });
        }
      });
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

  const startgame = ({ start }) => {
    games_doc.get().then((doc) => {
      if (doc.data()) {
        doc.ref.update({ start: true }).then(start);
      }
    });
  };

  const headerScreen = () => {
    return (
      <div className={classes.header}>
        <div style={{ fontSize: ".8rem" }}>
          Host:{" "}
          <span style={{ fontWeight: "bold", fontSize: "1rem" }}>
            {currGame.createdby}
          </span>
        </div>
        <div className={classes.letterAndTimer}>
          <div style={{ fontSize: ".8rem" }}>
            Click words starting with letter:{" "}
            <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              {currGame.letter}
            </span>
          </div>
          <div className={classes.timer}>
            <Timer.Minutes />: <Timer.Seconds />
          </div>
        </div>
        <div className={classes.players}>{listPlayers()}</div>
      </div>
    );
  };
  const listPlayers = () => {
    return (
      currGame.createdby &&
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
      })
    );
  };

  const hostInitialScreen = ({ start }) => {
    const invitePlayers = () => {
      if (navigator.share) {
        navigator
          .share({
            title: "web.dev",
            text: "Check out web.dev.",
            url: "https://newsgamer.vercel.app/games/"+gameId,
          })
          .then(() => console.log("Successful share"))
          .catch((error) => console.log("Error sharing", error));
      }
    };
    return (
      <>
        <div
          style={{
            textAlign: "center",
            padding: "20px 0 10px",
          }}
        >
          <button onClick={() => startgame({ start })}>start game</button>
          <div style={{ marginTop: "10px" }}>
            <button className="btn-dark" onClick={invitePlayers}>
              <i className="fa fa-user-plus btn-icon" aria-hidden="true"></i>
              Invite Players
            </button>
          </div>
        </div>
        <div>
          <p className="para" style={{ textAlign: "center" }}>
            Starting the game will reveal the paragraph to everyone in the game.
          </p>
          <p
            className="para"
            style={{ textAlign: "center", color: "white", background: "red" }}
          >
            *Leaving this page will make your score{" "}
            <span style={{ fontSize: "1.4rem" }}>0</span>.
          </p>
        </div>
      </>
    );
  };

  const otherPlayersInitialScreen = () => {
    return (
      <>
        <h2 style={{ paddingLeft: "10px" }}>
          Game is not yet started by {currGame.createdby}.
        </h2>
        <p className="para" style={{ textAlign: "center", color: "red" }}>
          *Leaving this page will make your score 0.
        </p>
      </>
    );
  };

  const newsPaper = () => {
    return (
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
    );
  };

  const gameOverScreen = (fade) => {
    return (
      <animated.div style={fade}>
        <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
          <div>
            <h1>Game Over</h1>
            <h3>
              Winner is{" "}
              <span style={{ fontWeight: "900" }}>
                {currGame.winner && currGame.winner}
              </span>
            </h3>
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
            <Link to="/" style={{ paddingTop: "10px" }}>
              <button>Go back to home page</button>
            </Link>
          </div>
        </div>
      </animated.div>
    );
  };

  const gameDoesNotExistScreen = () => {
    return (
      <div style={{ paddingTop: "50px" }}>
        <p className="para">This game is either over or deleted by the host.</p>
        <div style={{ textAlign: "center" }}>
          <Link to="/">
            <button>
              <i className="fa fa-arrow-left btn-icon" />
              Go Back To Home
            </button>
          </Link>
        </div>
      </div>
    );
  };

  const fade = useSpring({
    config: { mass: 20 },
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return (
    <animated.div style={fade}>
      {fetching ? (
        <div style={{ display: "grid", placeItems: "center" }}>
          <Loader />
        </div>
      ) : Object.keys(currGame).length === 0 ? (
        gameDoesNotExistScreen()
      ) : currGame.over ? (
        gameOverScreen(fade)
      ) : (
        <>
          <Timer>
            {({ start }) => (
              <>
                {headerScreen()}

                {!currGame.start ? (
                  <div style={{ marginTop: "130px" }}>
                    {currGame.createdby === user.displayName
                      ? hostInitialScreen([start])
                      : otherPlayersInitialScreen()}
                  </div>
                ) : (
                  newsPaper()
                )}
              </>
            )}
          </Timer>
        </>
      )}
    </animated.div>
  );
};

export default withRouter(GamePage);
