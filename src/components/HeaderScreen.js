import React from "react";

export const HeaderScreen = ({ classes, game, displayName }) => {
  return (
    <div className={classes.header}>
      <div style={{ color: "grey" }}>
        Host: <span style={{ fontWeight: "bold", color: "black" }}>{game?.createdby}</span>
      </div>
      <div style={{ color: "grey" }}>
        Click words starting with letter: <span style={{ fontWeight: "bold", color: "black" }}>{game?.letter}</span>
      </div>
      <ol className={classes.players_ol}>
        {game.players.map((player, i) => {
          return (
            <li
              key={i}
              className={classes.players_li}
              style={{
                color: displayName === player ? "green" : "red"
              }}
            >
              <div>{player.split(" ")[0]}</div>
              <div style={{ textAlign: "center", fontSize: "2rem" }}>{game?.[player] && game?.[player].length}</div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
