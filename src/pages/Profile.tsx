import React, { useEffect, useState } from "react";
import { Header } from "components";
import firebase from "../firebase";
import classes from "../styles/profile.module.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "actions";
import { Button } from "ui";
import { RootState } from "store";
import { GameInterface } from "interfaces";

const db = firebase.firestore();

export const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [playedGames, setPlayedGames] = useState([]);

  const winPercent =
    (playedGames.filter((game: GameInterface) => game.winner === user.uid)
      .length /
      playedGames.length) *
    100;

  useEffect(() => {
    let games: any = [];
    db.collection("games")
      .orderBy("creationdate", "desc")
      .where("players", "array-contains", user.uid)
      .get()
      .then((snap) => {
        snap.forEach((doc: any) => {
          doc.data().over && games.push(doc.data());
        });
        setPlayedGames(games);
      });
  }, [user.uid]);

  return (
    <>
      <Header />

      <div className={classes.body}>
        <div style={{ textAlign: "center" }}>
          <img src={user.photoURL} alt="" />
          <p>{user.displayName}</p>
          <p>{user.email}</p>
          <Button variant="red" onClick={() => dispatch(logout())}>
            <i className="fa fa-sign-out btn-icon" />
            Logout
          </Button>
        </div>

        <h3 style={{ textAlign: "center" }}>
          Winning % = {!isNaN(winPercent) && winPercent.toFixed(2)}
        </h3>
        <div>
          <strong>Games Played:</strong> {playedGames?.length}
        </div>
      </div>
    </>
  );
};
