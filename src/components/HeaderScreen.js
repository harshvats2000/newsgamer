import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  getDiplayNamesByUidArray,
  getDisplayNameByUid,
} from "functions/getDisplayNameByUid";
import styled from "styled-components";

export const HeaderScreen = ({ game }) => {
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
    <Header>
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
            );
          })}
      </PlayerNamesList>
    </Header>
  );
};

const Header = styled.div`
  position: fixed;
  top: 0;
  background: white;
  width: 100vw;
  padding: 10px 10px 0 10px;
  box-shadow: 0 0 10px grey;
  color: grey;

  span {
    font-weight: bold;
    color: black;
  }
`;

const PlayerNamesList = styled.ul`
  display: grid;
  margin: 0;
  padding: 10px 0 0;
  list-style-type: none;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, 50px);
  text-align: center;
`;
