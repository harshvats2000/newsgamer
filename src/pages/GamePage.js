import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { content, header_height } from "../constants";
import firebase from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import {
  addNewPlayerToCurrGame,
  gameOver,
  listenToRealTimeGameChanges,
  FETCHING_CURRENT_GAME,
  RESET_CURRENT_GAME,
} from "actions";
import { findWinner } from "utils";
import {
  HostInitialScreen,
  OtherPlayersInitialScreen,
  Loader,
  NewsPaper,
  GamePageHeader,
  GameDoesNotExistScreen,
  GameOverScreen,
} from "components";

const db = firebase.firestore();

export const GamePage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const gameId = location.pathname.split("/")[2];
  const games_doc = db.collection("games").doc(gameId);
  const { game, fetchingGame: fetching } = useSelector((state) => state.game);
  const {
    user: { uid },
  } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch({ type: FETCHING_CURRENT_GAME });

    return () => dispatch({ type: RESET_CURRENT_GAME });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const unsubscribe = dispatch(listenToRealTimeGameChanges(games_doc));

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (game?.[uid]) {
      game[uid].forEach((id) => {
        let el = document.getElementById(id);
        if (el) el.style.backgroundColor = "yellow";
      });
    }
  });

  useEffect(() => {
    if (game?.createdby) {
      dispatch(addNewPlayerToCurrGame(games_doc));
      const { isGameOver, winnerUid } = findWinner(game);
      if (isGameOver) {
        dispatch(gameOver(games_doc, winnerUid));
      }
    }
  }, [game, dispatch, games_doc]);

  const handleClick = (id) => {
    let words = game[uid];
    if (id.toLowerCase().search(game.letter) === 0) {
      if (!words.includes(id)) {
        words.push(id);
        games_doc.update({ [uid]: words });
      } else {
        document.getElementById(id).style.background = "gainsboro";
        words = words.filter((item) => item !== id);
        games_doc.update({ [uid]: words });
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

  if (!game) {
    return <GameDoesNotExistScreen />;
  }

  if (game?.over) {
    return <GameOverScreen {...{ game, uid }} />;
  }

  return (
    <>
      <GamePageHeader {...{ game }} />

      {!game?.start ? (
        <div style={{ marginTop: header_height }}>
          {game?.createdby === uid ? (
            <HostInitialScreen {...{ gameId }} />
          ) : (
            <OtherPlayersInitialScreen {...{ game }} />
          )}
        </div>
      ) : (
        <NewsPaper {...{ content, game, handleClick }} />
      )}
    </>
  );
};
