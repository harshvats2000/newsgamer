import React, { useState } from "react";
import { Link } from "react-router-dom";
import { deleteGame } from "actions";
import styled from "styled-components";
import { timeSince } from "utils";
import { getDisplayNameByUid } from "functions/getDisplayNameByUid";
import { useSelector } from "react-redux";

export function GameCard({ game, dispatch }) {
  const { gameid, createdby, players, createdAt } = game;
  const { user } = useSelector((state) => state.auth);
  const [hostName, setHostName] = useState(null);

  React.useEffect(() => {
    if (createdby === user.uid) {
      setHostName("You");
    } else {
      getDisplayNameByUid(createdby).then((name) => setHostName(name));
    }
  }, [createdby, user.uid]);

  return (
    <Card key={gameid}>
      <Row1>
        <Link to={`/game/${gameid}`}>
          <Text>
            Game by <span>{hostName}</span>.
            <br />
          </Text>
        </Link>
        {createdby === user.uid ? (
          <Actions>
            <TrashIcon
              className="fa fa-trash"
              onClick={() => dispatch(deleteGame(gameid))}
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

const Card = styled.div`
  box-shadow: 0px 23px 25px gainsboro;
  margin-bottom: 15px;
  padding: 10px;
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
    padding: 10px;
  }
`;
const TrashIcon = styled.i`
  color: red;
`;
