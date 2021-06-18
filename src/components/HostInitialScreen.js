import React from "react";
import { Button, Para } from "ui";
import firebase from "../firebase";
import { invitePlayers } from "functions/invitePlayers";
import { useSelector } from "react-redux";
const db = firebase.firestore();

export const HostInitialScreen = ({ gameId }) => {
  const { game } = useSelector((state) => state.game);
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
      <div
        style={{
          textAlign: "center",
          padding: "20px 0 10px",
        }}
      >
        {game.players.length > 1 ? (
          <Button
            bg="linear-gradient(0deg, #008900, #00dd00)"
            onClick={() => startgame()}
          >
            start game
          </Button>
        ) : (
          <p>You will be able to start this game once someone joins.</p>
        )}
        <div style={{ marginTop: "10px" }}>
          <Button
            bg="linear-gradient(0deg, #008900, #00dd00)"
            onClick={() => invitePlayers(gameId)}
          >
            <i className="fa fa-user-plus btn-icon" aria-hidden="true"></i>
            Invite Players
          </Button>
        </div>
      </div>
      <div>
        <Para color="red" style={{ textAlign: "center" }}>
          *Starting the game will reveal the paragraph to everyone in the game.
        </Para>
      </div>
    </>
  );
};
