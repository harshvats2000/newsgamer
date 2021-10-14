import React from "react";
import { Link } from "react-router-dom";
import { deleteGame } from "actions";
import styled from "styled-components";
import { timeSince } from "utils";
import { useSelector } from "react-redux";
import { isAdmin } from "helpers";
import { RootState } from "store";
import { GameInterface } from "../interfaces";

interface Props {
  game: GameInterface;
  dispatch: any;
}

export function GameCard({ game, dispatch }: Props) {
  const { gameId, createdBy, players, createdAt } = game;
  const { user } = useSelector((state: RootState) => state.auth);
  const hostName = createdBy.uid === user.uid ? "You" : createdBy.name;
  const totalPlayers = Object.keys(players).length;

  const handleDelete = (e: any) => {
    e.preventDefault();

    if (window.confirm("Are you sure you want to delete this game?")) {
      dispatch(deleteGame(gameId));
    }
  };

  return (
    <Card key={gameId} to={`/game/${gameId}`}>
      <Row1>
        <Text>
          Game by <span>{hostName}</span>.
          <br />
        </Text>
        {user.uid === createdBy.uid || isAdmin(user.uid) ? (
          <Actions>
            <TrashIcon className="fa fa-trash" onClick={handleDelete} />
          </Actions>
        ) : null}
      </Row1>
      <Row2>
        <Players>
          {totalPlayers} {totalPlayers === 1 ? "player" : "players"}
        </Players>
        <TimeAgo>{timeSince(createdAt)} ago</TimeAgo>
      </Row2>
    </Card>
  );
}

const Card = styled(Link)`
  display: block;
  text-decoration: none;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048),
    0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072),
    0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);
  margin-bottom: 35px;
  padding: 10px;
  border-radius: 4px;
`;
const Row1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Text = styled.p`
  color: rgb(0, 0, 0, 0.6);
  margin: 0;
  & > span {
    color: rgb(0, 0, 0);
  }
`;
const Row2 = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  color: rgb(0, 0, 0, 0.6);
  padding: 5px 0 0 0;
`;
const Players = styled.div``;
const TimeAgo = styled.div``;
const Actions = styled.div`
  i {
    cursor: pointer;
    width: 40px;
    height: 40px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background-color: rgb(255 0 0 / 10%);
  }
`;
const TrashIcon = styled.i`
  color: red;
`;
