import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { content } from "../constants";
import firebase from "../firebase";
import classes from "../styles/gamepage.module.css";
import Loader from "./Loader";
import { animated, useTransition } from "react-spring";
import { invitePlayers } from "../functions/invitePlayers";
import { useSelector, useDispatch } from "react-redux";
import { SET_CURR_GAME } from "../actions";
import { addNewPlayerToCurrGame, gameOver } from "../actions/currGame";
import { findWinner } from "../utils/findWinner";
import HostInitialScreen from "./HostInitialScreen";
import OtherPlayersInitialScreen from "./OtherPlayersInitialScreen";
import NewsPaper from "./NewsPaper";
import HeaderScreen from "./HeaderScreen";
import GameDoesNotExistScreen from "./GameDoesNotExistScreen";
import GameOverScreen from "./GameOverScreen";

const db = firebase.firestore();

const GamePage = ({ location }) => {
  const dispatch = useDispatch();
  const gameId = location.pathname.split("/")[2];
  const games_doc = db.collection("games").doc(gameId);
  const { currGame, fetchingGame: fetching } = useSelector((state) => state.currGame);
  const {
    user: { displayName }
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
      currGame[displayName].map((id) => {
        let el = document.getElementById(id);
        if (el) el.style.backgroundColor = "yellow";
      });
    }
  });

  useEffect(() => {
    if (currGame?.createdby) {
      dispatch(addNewPlayerToCurrGame(games_doc));
      const { isGameOver, winnerName } = findWinner(currGame);
      if (isGameOver) {
        dispatch(gameOver(games_doc, winnerName));
      }
    }
  }, [currGame]);

  const handleClick = (id) => {
    let words = currGame[displayName];
    if (id.toLowerCase().search(currGame.letter) === 0) {
      if (words.indexOf(id) === -1) {
        words.push(id);
        games_doc.update({ [displayName]: words });
      } else {
        document.getElementById(id).style.background = "gainsboro";
        words = words.filter((item) => item !== id);
        games_doc.update({ [displayName]: words });
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

  const [show, set] = useState(false);
  const transitions = useTransition(show, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  return transitions.map(({ item, key, props }) => (
    <animated.div style={props} key={key}>
      {fetching ? (
        <div style={{ display: "grid", placeItems: "center" }}>
          <Loader />
        </div>
      ) : !currGame ? (
        <GameDoesNotExistScreen />
      ) : currGame?.over ? (
        <GameOverScreen {...{ currGame, displayName }} />
      ) : (
        <>
          <HeaderScreen {...{ classes, currGame, displayName }} />

          {!currGame?.start ? (
            <div style={{ marginTop: "130px" }}>
              {currGame?.createdby === displayName ? (
                <HostInitialScreen {...{ currGame, startgame, invitePlayers, gameId }} />
              ) : (
                <OtherPlayersInitialScreen {...{ currGame }} />
              )}
            </div>
          ) : (
            <NewsPaper {...{ content, currGame, handleClick }} />
          )}
        </>
      )}
    </animated.div>
  ));
};

export default withRouter(GamePage);
