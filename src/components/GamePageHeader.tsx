import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  getDiplayNamesByUidArray,
  getDisplayNameByUid,
} from "functions/getDisplayNameByUid";
import styled from "styled-components";
import { header_height } from "../constants";
import { RootState } from "store";

interface Props {
  game: any;
}

interface Player {
  name: string;
  uid: string;
}

export const GamePageHeader = ({ game }: Props) => {
  const {
    user: { uid: currentUserUid },
  } = useSelector((state: RootState) => state.auth);
  const [players, setPlayers] = useState<Player[]>([]);
  const [hostName, setHostName] = useState("Loading...");

  React.useEffect(() => {
    getDisplayNameByUid(currentUserUid).then((name: string) => {
      setHostName(name);
    });
    getDiplayNamesByUidArray(game?.players).then((names) => {
      setPlayers(names.map((name, i) => ({ name, uid: game.players[i] })));
    });
  }, [game, currentUserUid]);

  return (
    <Wrapper>
      <Container>
        <Flex>
          <div>
            Host: <span>{hostName}</span>
          </div>
          <div>
            Letter: <span>{game?.letter}</span>
          </div>
        </Flex>

        <PlayerNamesList>
          {players.length > 0
            ? players.map(({ name, uid }, i) => {
                return (
                  <li
                    key={uid}
                    style={{ color: currentUserUid === uid ? "green" : "red" }}
                  >
                    <div>{name.split(" ")[0]}</div>
                    <div style={{ fontSize: "2rem" }}>
                      {game[game.players[i]].length}
                    </div>
                  </li>
                );
              })
            : "Loading players..."}
        </PlayerNamesList>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: ${header_height};
  position: fixed;
  top: 0;
  background: white;
  width: 100vw;
  padding: 10px 10px 0 10px;
  box-shadow: 0 0 10px grey;
  color: grey;
`;

const Container = styled.div`
  span {
    font-weight: bold;
    color: black;
  }
`;

const Flex = styled.div`
  max-width: 300px;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  line-height: 25px;
  > div {
    text-align: center;
  }
`;

const PlayerNamesList = styled.ul`
  display: flex;
  padding: 10px 0 0;
  list-style-type: none;
  text-align: center;
  margin: 0;
  justify-content: center;

  li {
    padding: 0 10px;
  }
`;
