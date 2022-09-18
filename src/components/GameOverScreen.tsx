import { GameInterface } from "interfaces";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "ui";
import Confetti from "react-confetti";

interface Props {
  game: GameInterface;
  uid: string;
}
interface Player {
  uid: string;
  score: number;
  name: string;
  email: string;
  photoURL: string;
}

export const GameOverScreen = ({ game, uid }: Props) => {
  const initial_array: Player[] = Object.keys(game.players).map((key: string) => ({
    uid: key,
    score: game.players[key].words.length,
    name: game.players[key].name,
    email: game.players[key].email,
    photoURL: game.players[key].photoURL
  }));

  const sorted_array = initial_array.sort((a: any, b: any) => b.score - a.score);

  return (
    <>
      {game.winner.uid === uid && <Confetti />}
      <Wrapper>
        <div style={{ marginTop: -100 }}>
          <h1 className="text-center">Game Over</h1>
          <h3 className="text-center">{game.winner.uid === uid ? "You Won 🏆" : "You Lose 😔"}</h3>
          <hr />
          <Players>
            {sorted_array.map((player: Player, i: number) => {
              return (
                <div
                  key={player.uid}
                  // style={{
                  //   color: player.uid === uid ? "green" : "unset"
                  // }}
                  className={`py-2 ${player.uid === uid ? "text-success" : ""}`}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <div className="me-2">{i + 1}</div>
                      <img src={player.photoURL} alt="" width="50" className="rounded" />
                      <div className="d-flex align-items-center">
                        <div className="px-2">
                          <div>{player.name}</div>
                          <div className="text-muted">{player.email}</div>
                        </div>
                      </div>
                    </div>
                    <div>{player.score}</div>
                  </div>
                </div>
              );
            })}
          </Players>
          <div className="text-center mt-3">
            <Link to="/">
              <Button>Go To Home</Button>
            </Link>
            <Link to="/profile/me" className="ms-2">
              <Button>Go To Profile</Button>
            </Link>
          </div>
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

const Players = styled.div``;
