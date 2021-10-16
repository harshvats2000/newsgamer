import { listenToChats, sendChatMessage, updateScore } from "actions";
import { isProduction } from "helpers";
import { Chat } from "interfaces";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import styled from "styled-components";
import { content, header_height } from "../constants";

export const NewsPaper = () => {
  const { game, chats } = useSelector((state: RootState) => state.game);
  const { uid } = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const [showChats, setShowChats] = useState(true);
  const [numOfUnreadChats, setNumOfUnreadChats] = useState(0);

  React.useEffect(() => {
    if (isProduction()) {
      disableBrowserFind();
      window.addEventListener("contextmenu", disableRightClick);
    }

    const unsubscribe = dispatch(listenToChats());

    return () => {
      unsubscribe();
      window.removeEventListener("contextmenu", disableRightClick);
    };
  }, [dispatch]);

  React.useEffect(() => {
    if (showChats) {
      setNumOfUnreadChats(0);
      scrollToBottomOfChats();
    }
  }, [showChats]);

  React.useEffect(() => {
    scrollToBottomOfChats();

    if (!showChats) {
      setNumOfUnreadChats(numOfUnreadChats + 1);
    }
  }, [chats]);

  React.useEffect(() => {
    if (game?.players[uid]) {
      game.players[uid].words.forEach((id: string) => {
        let el = document.getElementById(id);
        if (el) el.style.backgroundColor = "yellow";
      });
    }
  }, [game, uid]);

  const handleWordClick = (id: string) => {
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

  const handleSendChat = (msg: string) => {
    dispatch(sendChatMessage(msg));
  };

  const toggleChatsDisplay = () => {
    setShowChats(!showChats);
  };

  return (
    <Wrapper>
      <Paper onContextMenu={() => false}>
        {content[game.paraIndex].split(" ").map((word: string, i: number) => {
          let id = word.trim().replace("”", "").replace("“", "").replace(",", "") + i;
          return (
            <span key={i} style={{ whiteSpace: "initial" }}>
              <span id={id} onClick={(e) => handleWordClick(id)}>
                {word}
              </span>{" "}
            </span>
          );
        })}
      </Paper>

      <ChatsBox showChats={showChats} id="chats-box">
        {chats.map((c: Chat, i: number) => (
          <p key={i}>
            <strong>{c.displayName}: </strong>
            {c.msg}
          </p>
        ))}
      </ChatsBox>

      <Actions>
        <ChatToggleBtn onClick={toggleChatsDisplay}>
          {showChats ? "hide chats" : "show chats"}{" "}
          {!showChats && numOfUnreadChats > 0 && <UnRead>{numOfUnreadChats}</UnRead>}
        </ChatToggleBtn>

        <ChatsOptions>
          <button onClick={() => handleSendChat("Noobs")}>Noobs</button>
          <button onClick={() => handleSendChat("🔥")}>🔥</button>
          <button onClick={() => handleSendChat("😂")}>😂</button>
        </ChatsOptions>
      </Actions>
    </Wrapper>
  );
};

const scrollToBottomOfChats = () => {
  var chatsDiv = document.getElementById("chats-box");
  if (chatsDiv) {
    chatsDiv.scrollTop = chatsDiv.scrollHeight;
  }
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
  background-color: gainsboro;
`;

const Paper = styled.div`
  white-space: pre-wrap;
  padding: 20px 10px 40px;
  line-height: 2.5rem;
  margin-top: ${header_height};
  text-align: justify;
  font-size: 1.3rem;
  z-index: 10;
  position: relative;
`;

const ChatsBox = styled.div<{ showChats: boolean }>`
  display: ${(props) => (props.showChats ? "block" : "none")};
  position: fixed;
  left: 0px;
  bottom: 50px;
  background: ${({ theme }) => theme.dark.bg};
  color: ${({ theme }) => theme.dark.text};
  z-index: 30;
  max-height: 200px;
  overflow: scroll;
  padding: 0 10px;
  box-shadow: 0 4px 10px 0 rgb(0 0 0 / 60%);
  border-radius: 4px;
  p {
    margin: 5px 0;
    font-size: 12px;
  }
`;

const ChatsOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3px;
`;

const ChatToggleBtn = styled.button`
  position: relative;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 11;
  button {
    background: ${({ theme }) => theme.dark.bg};
    color: ${({ theme }) => theme.dark.text};
    border-radius: 4px 4px 0 0;
    padding: 10px;
    border: none;
  }
`;

const UnRead = styled.span`
  position: absolute;
  right: -8px;
  top: -8px;
  width: 22px;
  height: 24px;
  display: grid;
  place-items: center;
  background: red;
  border-radius: 100%;
  font-weight: bold;
  color: white;
`;
