import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  getDiplayNamesByUidArray,
  getDisplayNameByUid,
} from "functions/getDisplayNameByUid";

export const HeaderScreen = ({ classes, game }) => {
  const {
    user: { uid },
  } = useSelector((state) => state.auth);
  const [playerNames, setPlayerNames] = useState([]);
  const [hostName, setHostName] = useState(null);

  React.useEffect(() => {
    getDisplayNameByUid(uid).then((name) => {
      setHostName(name);
    });
    getDiplayNamesByUidArray(game?.players).then((names) => {
      setPlayerNames(names);
    });
  }, [game, uid]);

  return (
    <div className={classes.header}>
      <div style={{ color: "grey" }}>
        Host:{" "}
        <span style={{ fontWeight: "bold", color: "black" }}>{hostName}</span>
      </div>
      <div style={{ color: "grey" }}>
        Click words starting with letter:{" "}
        <span style={{ fontWeight: "bold", color: "black" }}>
          {game?.letter}
        </span>
      </div>
      <ol className={classes.players_ol}>
        {playerNames.length > 0 &&
          playerNames.map((playerName, i) => {
            return (
              <li
                key={i}
                className={classes.playerNames_li}
                style={{
                  color: uid === playerName ? "green" : "red",
                }}
              >
                <div>{playerName.split(" ")[0]}</div>
                <div style={{ textAlign: "center", fontSize: "2rem" }}>
                  {game[game.players[i]].length}
                </div>
              </li>
            );
          })}
      </ol>
    </div>
  );
};
