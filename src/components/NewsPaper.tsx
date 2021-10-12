import { isProduction } from "functions";
import { GameInterface } from "interfaces";
import React from "react";
import styled from "styled-components";
import { header_height } from "../constants";

interface Props {
  content: string[];
  game: GameInterface;
  handleClick: any;
}

const disableBrowserFind = () => {
  document.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (e.metaKey && e.key === "f") {
      alert(`Seriously?? NewsGamer will kick your ass next time if you tried to cheat.`);
    }
  });
};

const disableRightClick = (e: any) => {
  e.preventDefault();
  alert(`Don't you even think about that. We don't allow right clicks here.`);
};

export const NewsPaper = ({ content, game, handleClick }: Props) => {
  React.useEffect(() => {
    if (isProduction()) {
      disableBrowserFind();

      // disable right click
      window.addEventListener("contextmenu", disableRightClick);
    }

    return () => {
      // enable right click
      window.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  return (
    <Wrapper onContextMenu={() => false}>
      {content[game?.paraIndex].split(" ").map((word: string, i: number) => {
        let id = word.trim().replace("”", "").replace("“", "").replace(",", "") + i;
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
