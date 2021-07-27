import { getDiplayNamesByUidArray } from "functions/getDisplayNameByUid";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "ui";

export const GameOverScreen = ({ game, uid }) => {
  const initial_array = game.players.map((playerUid) => ({
    playerUid: playerUid,
    score: game?.[playerUid].length,
  }));
  const [playerNames, setPlayerNames] = useState([]);

  const sorted_array = initial_array.sort((a, b) => b.score - a.score);

  React.useEffect(() => {
    getDiplayNamesByUidArray(sorted_array.map((item) => item.playerUid)).then(
      (names) => {
        names = setPlayerNames(names);
      }
    );
  }, [sorted_array]);

  return (
    <>
      <Wrapper>
        <div>
          <h1 style={{ textAlign: "center" }}>Game Over</h1>
          <h3 style={{ textAlign: "center" }}>
            {game.winner === uid ? "You Won 🏆." : "You Lose!"}
          </h3>
          <hr />
          <Players>
            {sorted_array.map((player, i) => {
              return (
                <div
                  style={{
                    color: player.uid === uid ? "green" : "red",
                  }}
                >
                  {i + 1}. {playerNames[i]}: {player.score}
                </div>
              );
            })}
          </Players>
          <Link to="/">
            <Button style={{ marginTop: "20px" }}>Go back to home page</Button>
          </Link>
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
`;

const Players = styled.div`
  > div {
    font-weight: 600;
    margin-bottom: 8px;
  }
`;
