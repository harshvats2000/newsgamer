import React, { useEffect, useState } from "react";
import { Header, Loader } from "components";
import firebase from "../firebase";
import classes from "../styles/profile.module.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "actions";
import { Button } from "ui";
import { RootState } from "store";
import { GameInterface } from "interfaces";
import styled from "styled-components";
import moment from "moment";
import { Link } from "react-router-dom";

const db = firebase.firestore();

export const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [playedGames, setPlayedGames] = useState([]);
  const [fetching, setFetching] = useState<boolean>(true);

  // const winPercent =
  //   (playedGames.filter((game: GameInterface) => game.winner === user.uid).length / playedGames.length) * 100;

  useEffect(() => {
    let games: any = [];
    db.collection("games")
      .where(`players.${user.uid}.email`, ">", "''")
      .get()
      .then((snap) => {
        snap.forEach((doc: any) => {
          doc.data().over && games.push(doc.data());
        });

        games = games.sort((a: GameInterface, b: GameInterface) => b.overtimestamp - a.overtimestamp);

        setPlayedGames(games);
        setFetching(false);
      });
  }, [user.uid]);

  return (
    <>
      <Header />

      <div className={classes.body}>
        <div className="d-flex">
          <div>
            <img src={user.photoURL} alt="" className="rounded" referrerPolicy="no-referrer" />
          </div>
          <div className="ps-2">
            <h4 style={{ width: "calc(100vw - 120px)", maxWidth: 250 }} className="m-0 text-truncate">
              {user.displayName}
            </h4>
            <p style={{ width: "calc(100vw - 120px)", maxWidth: 250 }} className="mb-1 text-muted text-truncate">
              {user.email}
            </p>
            <Link to="/" className="me-2">
              <Button>
                {/* <i className="fa fa-arrow-left btn-icon" /> */}
                Go To Home
              </Button>
            </Link>
            <Button className="bg-danger text-white" variant="red" onClick={() => dispatch(logout())}>
              <i className="fa fa-sign-out btn-icon text-white" />
              Logout
            </Button>
          </div>
        </div>

        {/* <h3 style={{ textAlign: "center" }}>Winning % = {!isNaN(winPercent) && winPercent.toFixed(2)}</h3> */}

        {fetching ? (
          <Loader />
        ) : (
          <>
            <h3 className="my-3">
              {playedGames?.length}{" "}
              <span className="text-muted fs-4">{playedGames?.length === 1 ? "game" : "games"} played</span>
            </h3>

            {playedGames.map((game: GameInterface) => (
              <div key={game.gameId} className="p-2 bg-dark mb-2">
                <div className="d-flex align-items-center justify-content-between">
                  <div style={{ color: user.uid === game.winner.uid ? "green" : "red" }}>
                    {user.uid === game.winner.uid ? "Won" : "Lost"}
                  </div>
                  <Link to={`/game/${game.gameId}`}>View Score</Link>
                </div>

                <div className="d-flex align-items-center justify-content-between pt-2">
                  <div>
                    {Object.keys(game.players).map((player) => (
                      <img
                        src={game.players[player].photoURL}
                        key={game.players[player].uid}
                        width="30"
                        className="rounded me-1"
                        referrerPolicy="no-referrer"
                      />
                    ))}
                  </div>
                  <div>{moment(game.overtimestamp).fromNow()}</div>
                </div>
              </div>
            ))}

            {/* <div className="text-danger text-center mt-3">*Profile Page Coming soon</div> */}
          </>
        )}
      </div>
    </>
  );
};
