import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { content, max_score } from "../constants";
import firebase from "../firebase";
import classes from "../styles/gamepage.module.css";
import Loader from "./Loader";
import { animated, useTransition } from "react-spring";
import { invitePlayers } from "../functions/invitePlayers";
import { useSelector, useDispatch } from "react-redux";
import { SET_CURR_GAME } from "../actions";
import { addNewPlayerToCurrGame, addWinner } from "../actions/currGame";

const db = firebase.firestore();

const GamePage = ({ location }) => {
  const dispatch = useDispatch();
  const gameId = location.pathname.split("/")[2];
  const games_doc = db.collection("games").doc(gameId);
  const { currGame, fetchingGame: fetching } = useSelector((state) => state.currGame);
  const {
    user: { displayName },
  } = useSelector((state) => state.auth);

  useEffect(() => {
    // Listen for live changes in the current game
    games_doc.onSnapshot((doc) => {
      if (doc.data()) dispatch({ type: SET_CURR_GAME, payload: doc.data() });
      else dispatch({ type: SET_CURR_GAME, payload: null });
    });
  }, []);

  useEffect(() => {
    if (currGame?.[displayName]) {
      // Highlight initial words of array
      currGame[displayName].map((id) => {
        let el = document.getElementById(id);
        if (el) el.style.backgroundColor = "yellow";
      });
    }
  });

  useEffect(() => {
    // Making sure game exists
    if (currGame?.createdby) {
      // If any new player comes, add him to game
      dispatch(addNewPlayerToCurrGame(games_doc));

      // Add winner on score greater than max_score
      dispatch(addWinner(games_doc));
    }
  }, [currGame]);

  const handleClick = (id) => {
    let words = currGame[displayName];
    // If the word is eligible
    if (id.toLowerCase().search(currGame.letter) === 0) {
      // If it's a new word
      if (words.indexOf(id) === -1) {
        // document.getElementById(`${word}${i}`).style.background = 'yellow'; // Highlight the word
        words.push(id);
        games_doc.update({ [displayName]: words }); // Update words in database
      } else {
        document.getElementById(id).style.background = "gainsboro"; // Remove highlighting
        words = words.filter((item) => item !== id);
        games_doc.update({ [displayName]: words }); // Update words in database
      }
    }
  };

  const startgame = () => {
    games_doc.get().then((doc) => {
      if (doc.data()) {
        doc.ref.update({ start: true });
      }
    });
  };

  const headerScreen = () => {
    return (
      <div className={classes.header}>
        <div style={{ color: "grey" }}>
          Host: <span style={{ fontWeight: "bold", color: "black" }}>{currGame?.createdby}</span>
        </div>
        <div style={{ color: "grey" }}>
          Click words starting with letter: <span style={{ fontWeight: "bold", color: "black" }}>{currGame?.letter}</span>
        </div>
        <ol className={classes.players_ol}>{listPlayers()}</ol>
      </div>
    );
  };

  const listPlayers = () => {
    return currGame.players.map((player, i) => {
      return (
        <li
          key={i}
          className={classes.players_li}
          style={{
            color: displayName === player ? "green" : "red",
          }}
        >
          <div>{player.split(" ")[0]}</div>
          <div style={{ textAlign: "center", fontSize: "2rem" }}>{currGame?.[player] && currGame?.[player].length}</div>
        </li>
      );
    });
  };

  const hostInitialScreen = () => {
    return (
      <>
        <div
          style={{
            textAlign: "center",
            padding: "20px 0 10px",
          }}
        >
          <button className="btn btn-black" onClick={() => startgame()}>
            start game
          </button>
          <div style={{ marginTop: "10px" }}>
            <button className="btn btn-black" onClick={() => invitePlayers(gameId)}>
              <i className="fa fa-user-plus btn-icon" aria-hidden="true"></i>
              Invite Players
            </button>
          </div>
        </div>
        <div>
          <p className="para" style={{ textAlign: "center", boxShadow: "0 0 10px gainsboro" }}>
            Starting the game will reveal the paragraph to everyone in the game.
          </p>
        </div>
      </>
    );
  };

  const otherPlayersInitialScreen = () => {
    return (
      <>
        <h2 style={{ paddingLeft: "10px" }}>Game is not yet started by {currGame?.createdby}.</h2>
      </>
    );
  };

  const newsPaper = () => {
    return (
      <div className="newspaper">
        {content[currGame?.paraindex].split(" ").map((word, i) => {
          let id = word.trim().replace("”", "").replace("“", "").replace(",", "") + i;
          return (
            <span key={i} style={{ whiteSpace: "initial" }}>
              <span id={id} onClick={(e) => handleClick(id)}>
                {word}
              </span>{" "}
            </span>
          );
        })}
      </div>
    );
  };

  const gameOverScreen = () => {
    const initial_array = currGame.players.map((player) => ({
      name: player,
      score: currGame?.[player].length,
    }));

    const sorted_array = initial_array.sort((a, b) => b.score - a.score);
    return (
      <>
        <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
          <div>
            <h1 style={{ textAlign: "center" }}>Game Over</h1>
            <h3 style={{ textAlign: "center" }}>{currGame.winner === displayName ? "You Won 🏆." : "You Lose!"}</h3>
            <hr />
            <div>
              {sorted_array.map((player, i) => {
                return (
                  <div
                    style={{
                      color: player.name === displayName ? "green" : "red",
                      fontWeight: "600",
                      marginBottom: "8px",
                    }}
                  >
                    {i + 1}. {player.name}: {player.score}
                  </div>
                );
              })}
            </div>
            <Link to="/">
              <button className="btn btn-black" style={{ marginTop: "20px" }}>
                Go back to home page
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  };

  const gameDoesNotExistScreen = () => {
    return (
      <div style={{ paddingTop: "50px" }}>
        <p className="para">This game is either over or deleted by the host.</p>
        <div style={{ textAlign: "center" }}>
          <Link to="/">
            <button className="btn btn-black">
              <i className="fa fa-arrow-left btn-icon" />
              Go Back To Home
            </button>
          </Link>
        </div>
      </div>
    );
  };

  const [show, set] = useState(false);
  const transitions = useTransition(show, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return transitions.map(({ item, key, props }) => (
    <animated.div style={props} key={key}>
      {fetching ? (
        <div style={{ display: "grid", placeItems: "center" }}>
          <Loader />
        </div>
      ) : !currGame ? (
        gameDoesNotExistScreen()
      ) : currGame?.over ? (
        gameOverScreen()
      ) : (
        <>
          {headerScreen()}

          {!currGame?.start ? (
            <div style={{ marginTop: "130px" }}>{currGame?.createdby === displayName ? hostInitialScreen() : otherPlayersInitialScreen()}</div>
          ) : (
            newsPaper()
          )}
        </>
      )}
    </animated.div>
  ));
};

export default withRouter(GamePage);
