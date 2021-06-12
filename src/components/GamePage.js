import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { content } from "../constants";
import firebase from "../firebase";
import classes from "../styles/gamepage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { addNewPlayerToCurrGame, gameOver, listenToRealTimeGameChanges, FETCHING_CURRENT_GAME, RESET_CURRENT_GAME } from "actions";
import { findWinner } from "utils";
import { HostInitialScreen, OtherPlayersInitialScreen, Loader, NewsPaper, HeaderScreen, GameDoesNotExistScreen, GameOverScreen } from "components";

const db = firebase.firestore();

export const GamePage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const gameId = location.pathname.split("/")[2];
  const games_doc = db.collection("games").doc(gameId);
  const { currGame, fetchingGame: fetching } = useSelector((state) => state.currGame);
  const {
    user: { displayName }
  } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch({ type: FETCHING_CURRENT_GAME });

    return () => dispatch({ type: RESET_CURRENT_GAME });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(listenToRealTimeGameChanges(games_doc));
    // eslint-disable-next-line
  }, [currGame]);

  useEffect(() => {
    if (currGame?.[displayName]) {
      currGame[displayName].forEach((id) => {
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
  }, [currGame, dispatch, games_doc]);

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

  if (fetching) {
    return (
      <div style={{ display: "grid", placeItems: "center" }}>
        <Loader />
      </div>
    );
  }

  if (!currGame) {
    return <GameDoesNotExistScreen />;
  }

  if (currGame?.over) {
    return <GameOverScreen {...{ currGame, displayName }} />;
  }

  return (
    <>
      <HeaderScreen {...{ classes, currGame, displayName }} />

      {!currGame?.start ? (
        <div style={{ marginTop: "130px" }}>
          {currGame?.createdby === displayName ? <HostInitialScreen {...{ gameId }} /> : <OtherPlayersInitialScreen {...{ currGame }} />}
        </div>
      ) : (
        <NewsPaper {...{ content, currGame, handleClick }} />
      )}
    </>
  );
};
