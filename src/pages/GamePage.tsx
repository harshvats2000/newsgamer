import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { header_height } from "../constants";
import { useSelector, useDispatch } from "react-redux";
import {
  addNewPlayerToCurrGame,
  gameOver,
  listenToRealTimeGameChanges,
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
import { RootState } from "store";

export const GamePage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const gameId = location.pathname.split("/")[2];
  const { game, fetchingGame: fetching } = useSelector((state: RootState) => state.game);
  const {
    user: { uid },
  } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const unsubscribe = dispatch(listenToRealTimeGameChanges(gameId));

    return () => {
      dispatch({ type: RESET_CURRENT_GAME });
      unsubscribe();
    };
  }, [dispatch]);

  useEffect(() => {
    if (game?.createdBy) {
      if (!game.players[uid]) {
        dispatch(addNewPlayerToCurrGame(gameId));
      }

      const { winner } = findWinner(game);
      if (winner) {
        dispatch(gameOver(gameId, winner));
      }
    }
  }, [game, dispatch, gameId]);

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
          {game?.createdBy.uid === uid ? (
            <HostInitialScreen {...{ gameId }} />
          ) : (
            <OtherPlayersInitialScreen {...{ game }} />
          )}
        </div>
      ) : (
        <NewsPaper />
      )}
    </>
  );
};
