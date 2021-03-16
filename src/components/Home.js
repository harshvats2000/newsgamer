import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "./Header";
import classes from "../styles/home.module.css";
import Loader from "./Loader";
import { useSelector, useDispatch } from "react-redux";
import { createGame, deleteGame } from "../actions/game";
import { FETCHING_GAMES } from "../actions";
import { fetchGames } from "../actions/games";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);
  const { availGames, fetchingGames: loading } = useSelector((state) => state.games);

  useEffect(() => {
    dispatch({
      type: FETCHING_GAMES,
      payload: true,
    });

    dispatch(fetchGames());

    // Set interval to update games in every 10s
    setInterval(() => dispatch(fetchGames()), 10000);
  }, []);

  const nameAndActions = () => {
    return (
      <div style={{ padding: "10px 10px 20px", textAlign: "center" }}>
        <h2>
          Hello, <span style={{ color: "green", textTransform: "capitalize" }}>{user?.displayName}</span>
        </h2>
        <Link to="/profile/me" style={{ marginRight: "10px" }}>
          <button className="btn btn-green">
            <i className="fa fa-user btn-icon" />
            Profile
          </button>
        </Link>
        <button className="btn btn-black" onClick={() => dispatch(createGame(user.displayName, history))}>
          <i className="fa fa-plus btn-icon" />
          create new game
        </button>
      </div>
    );
  };

  const refreshLine = () => {
    return (
      <div className={classes.refresh}>
        <div style={{ fontSize: "0.8rem" }}>
          The games are updated every <span style={{ fontWeight: 900, verticalAlign: "middle" }}>5</span> seconds.
        </div>
        <button className="btn">
          <i className="fa fa-refresh" id="refresh-icon" onClick={(e) => fetchGames()} />
        </button>
      </div>
    );
  };

  const availGameList = (game, i) => {
    return (
      <div key={i} className={classes.card}>
        <Link to={`/game/${game.gameid}`} style={{ flex: 1 }}>
          <div>
            Game by <span style={{ fontWeight: "600" }}>{game.createdby}</span>.
          </div>
        </Link>
        {game.createdby === user.displayName ? (
          <div style={{ marginRight: "10px" }}>
            <i className="fa fa-trash" style={{ color: "red" }} onClick={() => dispatch(deleteGame(game.gameid))} />
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <>
      <Header />

      <div style={{ maxWidth: 800, margin: "auto", marginTop: "65px" }}>
        {nameAndActions()}

        {refreshLine()}

        {loading ? (
          <Loader />
        ) : (
          <div
            style={{
              marginTop: "5px",
              padding: "20px 10px 10px",
              fontSize: "1.2rem",
            }}
          >
            {availGames.length === 0 ? (
              <p className="para" style={{ boxShadow: "0 0 10px gainsboro" }}>
                No games are being played right now.
              </p>
            ) : null}
            {availGames.map((game, i) => availGameList(game, i))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
