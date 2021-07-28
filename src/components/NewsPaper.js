import React from "react";
import styled from "styled-components";
import { header_height } from "../constants";

export const NewsPaper = ({ content, game, handleClick }) => {
  return (
    <Wrapper>
      {content[game?.paraindex].split(" ").map((word, i) => {
        let id =
          word.trim().replace("”", "").replace("“", "").replace(",", "") + i;
        return (
          <span key={i} style={{ whiteSpace: "initial" }}>
            <span id={id} onClick={(e) => handleClick(id)}>
              {word}
            </span>{" "}
          </span>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  white-space: pre-wrap;
  padding: 20px;
  background-color: gainsboro;
  line-height: 2.5rem;
  margin-top: ${header_height};
  text-align: justify;
  font-size: 1.3rem;
`;
