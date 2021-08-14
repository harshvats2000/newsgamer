import React, { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Header, Loader, Layout } from "components";
import { useSelector, useDispatch } from "react-redux";
import { createGame, fetchGames } from "actions";
import styled from "styled-components";
import { GameCard, Button, Para } from "ui";
import { RootState } from "store";
import { GameInterface } from "interfaces";

const game_updating_interval = 30;

export const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state: RootState) => state.auth);
  const { availGames, fetchingGames: loading } = useSelector(
    (state: RootState) => state.games
  );

  useEffect(() => {
    dispatch(fetchGames());
    const interval = setInterval(
      () => dispatch(fetchGames()),
      game_updating_interval * 1000
    );
    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  const nameAndActions = () => {
    return (
      <NameAndActions>
        <DisplayName>{user?.displayName}</DisplayName>
        <Link to="/profile/me" style={{ marginRight: "10px" }}>
          <Button variant="green">
            <i className="fa fa-user btn-icon" />
            Profile
          </Button>
        </Link>
        <Button variant="green" onClick={() => dispatch(createGame(history))}>
          <i className="fa fa-plus btn-icon" />
          create new game
        </Button>
      </NameAndActions>
    );
  };

  const refreshLine = () => {
    return (
      <Refresh>
        <Para m="0px" size="13px">
          The games are updated every{" "}
          <span style={{ fontWeight: 900, verticalAlign: "middle" }}>
            {game_updating_interval}
          </span>{" "}
          seconds.
        </Para>
        <div>
          <i
            className="fa fa-refresh"
            id="refresh-icon"
            onClick={(e) => dispatch(fetchGames())}
          />
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

          <hr />

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
                <GameCard key={game.gameid} {...{ game, dispatch }} />
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
const NameAndActions = styled.div`
  padding: 0px 10px 10px;
  text-align: center;
`;
const DisplayName = styled.h2`
  color: green;
  text-transform: capitalize;
  margin-top: 5px;
`;
const Refresh = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px 0 10px;
  align-items: center;
  font-size: 1.5rem;
  padding: 10px;
`;
const AvailGamesWrapper = styled.div`
  padding: 10px 0;
  font-size: 1.2rem;
`;
