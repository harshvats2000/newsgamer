import React from "react";
import { Button, Para } from "ui";
import firebase from "../firebase";
import { invitePlayers } from "functions/invitePlayers";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { header_height } from "../constants";
import { RootState } from "store";

const db = firebase.firestore();

interface Props {
  gameId: string;
}

export const HostInitialScreen = ({ gameId }: Props) => {
  const { game } = useSelector((state: RootState) => state.game);
  const games_doc = db.collection("games").doc(gameId);

  const startgame = async () => {
    try {
      const doc = await games_doc.get();
      doc.ref.set({ start: true }, { merge: true });
    } catch (error) {
      alert("Error in starting game.");
    }
  };

  return (
    <>
      <Wrapper>
        <Container>
          {game.players.length > 1 ? (
            <Button variant="green" onClick={() => startgame()}>
              start game
            </Button>
          ) : (
            <p>You will be able to start this game once someone joins.</p>
          )}
          <div style={{ marginTop: "10px" }}>
            <Button variant="green" onClick={() => invitePlayers(gameId)}>
              <i className="fa fa-user-plus btn-icon" aria-hidden="true"></i>
              Invite Players
            </Button>
          </div>
          <div>
            <Para color="red" style={{ textAlign: "center" }}>
              *Starting the game will reveal the paragraph to everyone in the
              game.
            </Para>
          </div>
        </Container>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  text-align: center;
  padding: 20px 0 10px;
  display: grid;
  place-items: center;
  height: calc(100vh - ${header_height});
`;

const Container = styled.div``;
