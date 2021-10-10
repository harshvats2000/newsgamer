import { GameInterface } from "interfaces";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "ui";

interface Props {
  game: GameInterface;
  uid: string;
}
interface Player {
  uid: string;
  score: number;
  name: string;
}

export const GameOverScreen = ({ game, uid }: Props) => {
  const initial_array: Player[] = Object.keys(game.players).map((key: string) => ({
    uid: key,
    score: game.players[key].words.length,
    name: game.players[key].name,
  }));

  const sorted_array = initial_array.sort((a: any, b: any) => b.score - a.score);

  return (
    <>
      <Wrapper>
        <div>
          <h1 style={{ textAlign: "center" }}>Game Over</h1>
          <h3 style={{ textAlign: "center" }}>
            {game.winner.uid === uid ? "You Won 🏆." : "You Lose!"}
          </h3>
          <hr />
          <Players>
            {sorted_array.map((player: Player, i: number) => {
              return (
                <div
                  key={player.uid}
                  style={{
                    color: player.uid === uid ? "green" : "red",
                  }}
                >
                  {i + 1}. {player.name}: {player.score}
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
