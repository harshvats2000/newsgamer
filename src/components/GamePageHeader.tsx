import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { header_height } from "../constants";
import { RootState } from "store";
import { GameInterface } from "interfaces";
import { Link } from "react-router-dom";

interface Props {
  game: GameInterface;
}

export const GamePageHeader = ({ game }: Props) => {
  const players = {} as any;
  Object.keys(game.players)
    .sort()
    .forEach((key) => (players[key] = game.players[key]));
  const {
    user: { uid: currentUserUid },
  } = useSelector((state: RootState) => state.auth);

  return (
    <Wrapper>
      <Container>
        <Back to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="white"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
        </Back>
        <Flex>
          <div>
            Host: <span>{game.createdBy.name}</span>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 25px;
  padding-left: 15px;
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

const Back = styled(Link)`
  position: fixed;
  top: 7px;
  left: 5px;
  padding: 10px;
  background: black;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: grid;
  align-content: space-around;
  justify-content: center;
  svg {
    stroke: white;
  }
`;
