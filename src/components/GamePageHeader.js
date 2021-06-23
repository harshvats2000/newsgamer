import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  getDiplayNamesByUidArray,
  getDisplayNameByUid,
} from "functions/getDisplayNameByUid";
import styled from "styled-components";

export const GamePageHeader = ({ game }) => {
  const {
    user: { uid },
  } = useSelector((state) => state.auth);
  const [playerNames, setPlayerNames] = useState([]);
  const [hostName, setHostName] = useState(null);

  React.useEffect(() => {
    getDisplayNameByUid(uid).then((name) => {
      setHostName(name);
    });
    getDiplayNamesByUidArray(game?.players).then((names) => {
      setPlayerNames(names);
    });
  }, [game, uid]);

  return (
    <Wrapper>
      <Container>
        <div>
          Host: <span>{hostName}</span>
        </div>
        <div>
          Click words starting with letter: <span>{game?.letter}</span>
        </div>

        <PlayerNamesList>
          {playerNames.length > 0 &&
            playerNames.map((playerName, i) => {
              return (
                <>
                  <li
                    key={i}
                    style={{ color: uid === playerName ? "green" : "red" }}
                  >
                    <div>
                      {playerName.split(" ")[0][0]}
                      {playerName.split(" ")[1][0]}
                    </div>
                    <div style={{ fontSize: "2rem" }}>
                      {game[game.players[i]].length}
                    </div>
                  </li>
                  <li
                    key={i}
                    style={{ color: uid === playerName ? "green" : "red" }}
                  >
                    <div>
                      {playerName.split(" ")[0][0]}
                      {playerName.split(" ")[1][0]}
                    </div>
                    <div style={{ fontSize: "2rem" }}>
                      {game[game.players[i]].length}
                    </div>
                  </li>
                </>
              );
            })}
        </PlayerNamesList>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
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
