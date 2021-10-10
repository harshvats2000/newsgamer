import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getDisplayNameByUid } from "functions/getDisplayNameByUid";
import styled from "styled-components";
import { header_height } from "../constants";
import { RootState } from "store";
import { GameInterface } from "interfaces";

interface Props {
  game: GameInterface;
}

interface Player {
  name: string;
  uid: string;
}

export const GamePageHeader = ({ game }: Props) => {
  const players = {} as any;
  Object.keys(game.players)
    .sort()
    .forEach((key) => (players[key] = game.players[key]));
  const {
    user: { uid: currentUserUid },
  } = useSelector((state: RootState) => state.auth);
  const [hostName, setHostName] = useState("Loading...");

  React.useEffect(() => {
    getDisplayNameByUid(currentUserUid).then((name: string) => {
      setHostName(name);
    });
  });

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
          {Object.keys(players).length > 0
            ? Object.keys(players).map((key, i) => {
                return (
                  <li
                    key={players[key].uid}
                    style={{ color: currentUserUid === players[key].uid ? "green" : "red" }}
                  >
                    <div>{players[key].name.split(" ")[0]}</div>
                    <div style={{ fontSize: "2rem" }}>{players[key].words.length}</div>
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
