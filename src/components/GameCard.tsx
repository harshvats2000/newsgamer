import React, { Dispatch, useState } from "react";
import { Link } from "react-router-dom";
import { deleteGame } from "actions";
import styled from "styled-components";
import { timeSince } from "utils";
import { getDisplayNameByUid } from "functions/getDisplayNameByUid";
import { useSelector } from "react-redux";
import { adminUid } from "../constants";
import { isAdmin } from "functions/isAdmin";
import { RootState } from "store";
import { GameInterface } from "../interfaces";

interface Props {
  game: GameInterface;
  dispatch: Dispatch<any>;
}

export function GameCard({ game, dispatch }: Props) {
  const { gameId, createdBy, players, createdAt } = game;
  const { user } = useSelector((state: RootState) => state.auth);
  const [hostName, setHostName] = useState<string | null>(null);

  React.useEffect(() => {
    if (createdBy === user.uid) {
      setHostName("You");
    } else {
      getDisplayNameByUid(createdBy).then((name) => setHostName(name));
    }
  }, [createdBy, user.uid]);

  return (
    <Card key={gameId} to={`/game/${gameId}`}>
      <Row1>
        <Text>
          Game by <span>{hostName}</span>.
          <br />
        </Text>
        {user.uid === createdBy || isAdmin() ? (
          <Actions>
            <TrashIcon
              className="fa fa-trash"
              onClick={(e) => {
                e.preventDefault();
                if (
                  window.confirm("Are you sure you want to delete this game?")
                ) {
                  dispatch(deleteGame(gameId));
                }
              }}
            />
          </Actions>
        ) : null}
      </Row1>
      <Row2>
        <Players>{players.length} players</Players>
        <TimeAgo>{timeSince(createdAt)} ago</TimeAgo>
      </Row2>
    </Card>
  );
}

const Card = styled(Link)`
  display: block;
  text-decoration: none;
  box-shadow: 0px 23px 25px rgb(0 0 0 / 7%);
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid rgb(0, 0, 0, 0.1);
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
