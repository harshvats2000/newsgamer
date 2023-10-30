import React from "react";
import { Link } from "react-router-dom";
import { deleteGame } from "actions";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { isAdmin } from "helpers";
import { RootState } from "store";
import { GameInterface } from "../interfaces";
import { theme } from "../constants";
import moment from "moment";

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
    <Card key={gameId} to={`/game/${gameId}`} className="mb-2">
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
        <TimeAgo>{moment(createdAt).fromNow()}</TimeAgo>
      </Row2>
    </Card>
  );
}

const Card = styled(Link)`
  display: block;
  text-decoration: none;
  /* box-shadow: 0 1px 7px 0 rgba(0, 0, 0, 0.6); */
  background: ${theme.colors.surface};
  padding: 10px;
  border-radius: 4px;
`;
const Row1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Text = styled.p`
  margin: 0;
  color: ${theme.colors.textDim};
  & > span {
    color: ${theme.colors.textLight};
  }
`;
const Row2 = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  color: ${theme.colors.textDim};
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
