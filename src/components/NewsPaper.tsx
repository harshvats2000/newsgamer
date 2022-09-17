import { updateScore } from "actions";
import { isProduction } from "helpers";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import styled from "styled-components";
import { content, header_height, theme } from "../constants";

export const NewsPaper = () => {
  const { game } = useSelector((state: RootState) => state.game);
  const { uid } = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (isProduction()) {
      disableBrowserFind();
      window.addEventListener("contextmenu", disableRightClick);
    }

    return () => {
      window.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  React.useEffect(() => {
    if (game?.players[uid]) {
      game.players[uid].words.forEach((id: string) => {
        let el = document.getElementById(id);
        if (el) {
          el.style.backgroundColor = "yellow";
          el.style.color = "black";
        }
      });
    }
  }, [game, uid]);

  const handleClick = (id: string) => {
    let words = [...game.players[uid].words];
    const el = document.getElementById(id) as HTMLElement;

    if (id.charAt(0).toLowerCase() === game.letter) {
      if (!words.includes(id)) {
        words.push(id);
      } else {
        words = words.filter((word: string) => word !== id);
        el.style.background = "gainsboro";
      }

      dispatch(updateScore(words));
    }
  };

  return (
    <Wrapper onContextMenu={() => false}>
      {content[game.paraIndex].split(" ").map((word: string, i: number) => {
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

const Wrapper = styled.div`
  white-space: pre-wrap;
  padding: 20px;
  background-color: ${theme.colors.surface};
  color: rgb(255 255 255 / 50%);
  line-height: 2.5rem;
  margin-top: ${header_height};
  text-align: justify;
  font-size: 1.3rem;
`;
