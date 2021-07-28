import { header_height } from "../constants";
import { getDisplayNameByUid } from "functions/getDisplayNameByUid";
import React, { useState } from "react";
import styled from "styled-components";

export const OtherPlayersInitialScreen = ({ game }) => {
  const [hostName, setHostName] = useState(null);

  React.useEffect(() => {
    getDisplayNameByUid(game?.createdby).then((name) => setHostName(name));
  }, [game]);

  return (
    <Wrapper>
      <h2>Game is not yet started by {hostName}.</h2>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 10px;
  display: grid;
  place-items: center;
  height: calc(100vh - ${header_height});
`;
