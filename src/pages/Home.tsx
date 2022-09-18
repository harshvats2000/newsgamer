import React, { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Header, Loader, Layout } from "components";
import { useSelector, useDispatch } from "react-redux";
import { createGame, fetchGames } from "actions";
import styled from "styled-components";
import { GameCard, Button, Para } from "ui";
import { RootState } from "store";
import { GameInterface } from "interfaces";
import { GAME_UPDATING_INTERVAL } from "../constants";

export const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state: RootState) => state.auth);
  const { availGames, fetchingGames: loading } = useSelector((state: RootState) => state.games);

  useEffect(() => {
    dispatch(fetchGames());
    const interval = setInterval(() => dispatch(fetchGames()), GAME_UPDATING_INTERVAL * 1000);
    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  const nameAndActions = () => {
    return (
      <div className="d-flex">
        <img src={user.photoURL} key={user.uid} className="rounded" />
        <div className="ps-2">
          <h4 style={{ width: "calc(100vw - 120px)", maxWidth: 250 }} className="m-0 text-truncate">
            {user.displayName}
          </h4>
          <p style={{ width: "calc(100vw - 120px)", maxWidth: 250 }} className="mb-1 text-muted text-truncate">
            {user.email}
          </p>
          <div className="d-flex align-items-center">
            <Link to="/profile/me" className="me-2">
              <Button variant="green">
                <i className="fa fa-user btn-icon" />
                Profile
              </Button>
            </Link>
            <Button variant="green" onClick={() => dispatch(createGame(history))}>
              <i className="fa fa-plus btn-icon" />
              Create Game
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const refreshLine = () => {
    return (
      <Refresh>
        <p className="m-0 fs-6">
          The games are updated every <Seconds>{GAME_UPDATING_INTERVAL}</Seconds> seconds.
        </p>
        <div>
          <i className="fa fa-refresh" id="refresh-icon" onClick={(e) => dispatch(fetchGames())} />
        </div>
      </Refresh>
    );
  };

  return (
    <>
      <Header />
      <Layout>
        <Body>
          {nameAndActions()}

          {refreshLine()}

          <hr className="mt-0" />

          {loading ? (
            <Loader />
          ) : (
            <AvailGamesWrapper>
              {availGames.length === 0 ? (
                <Para m="0px" align="center">
                  No games are being played right now.
                </Para>
              ) : null}
              {availGames.map((game: GameInterface, i: number) => (
                <GameCard key={game.gameId} {...{ game, dispatch }} />
              ))}
            </AvailGamesWrapper>
          )}
        </Body>
      </Layout>
    </>
  );
};

const Body = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 10px;
`;
const Refresh = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  padding: 10px 0;
`;
const AvailGamesWrapper = styled.div`
  padding: 10px 0;
  font-size: 1.2rem;
`;
const Seconds = styled.span`
  font-weight: 900;
  vertical-align: middle;
`;
