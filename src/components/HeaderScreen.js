import React from "react";

const HeaderScreen = ({ classes, currGame, displayName }) => {
  return (
    <div className={classes.header}>
      <div style={{ color: "grey" }}>
        Host: <span style={{ fontWeight: "bold", color: "black" }}>{currGame?.createdby}</span>
      </div>
      <div style={{ color: "grey" }}>
        Click words starting with letter: <span style={{ fontWeight: "bold", color: "black" }}>{currGame?.letter}</span>
      </div>
      <ol className={classes.players_ol}>
        {currGame.players.map((player, i) => {
          return (
            <li
              key={i}
              className={classes.players_li}
              style={{
                color: displayName === player ? "green" : "red"
              }}
            >
              <div>{player.split(" ")[0]}</div>
              <div style={{ textAlign: "center", fontSize: "2rem" }}>{currGame?.[player] && currGame?.[player].length}</div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default HeaderScreen;
