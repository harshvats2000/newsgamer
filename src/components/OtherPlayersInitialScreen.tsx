import { header_height } from "../constants";
import React from "react";
import styled from "styled-components";
import { GameInterface } from "interfaces";

interface Props {
  game: GameInterface;
}

export const OtherPlayersInitialScreen = ({ game }: Props) => {
  return (
    <Wrapper>
      <h2>
        Game is not yet started by <span>{game.createdBy.name}</span>.
      </h2>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 10px;
  display: grid;
  place-items: center;
  height: calc(100vh - ${header_height});
  h2 {
    text-align: center;
    font-weight: normal;
    span {
      font-weight: bold;
    }
  }
`;
