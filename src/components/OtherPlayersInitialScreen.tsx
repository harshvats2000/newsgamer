import { header_height } from "../constants";
import { getDisplayNameByUid } from "functions/getDisplayNameByUid";
import React, { useState } from "react";
import styled from "styled-components";

interface Props {
  game: any;
}

export const OtherPlayersInitialScreen = ({ game }: Props) => {
  const [hostName, setHostName] = useState<string | null>(null);

  React.useEffect(() => {
    getDisplayNameByUid(game?.createdBy).then((name) => setHostName(name));
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
