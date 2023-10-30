import React from "react";
import { Link } from "react-router-dom";
import { Header, Layout } from "components";
import { max_score } from "../constants";
import { Para } from "ui";

const rules = [
  "To play this game, you must be logged in with a Google account.",
  "Click on 'Create Game.' This will take you to the game page. The game will be created but will not start until you click on the 'Start Game' button.",
  "Anyone who visits the new game page URL will automatically be joined in the game.",
  "All participants can see each other's names and scores at the top of the game page.",
  "A letter will appear at the top of the game page. It will be the same for all players, ensuring the same difficulty level for everyone.",
  "Once the game is started, a paragraph will appear, and players have to search for words starting with the given letter.",
  "Clicking the appropriate word will increase your score by 1.",
  `The player who finds ${max_score} appropriate words will be the winner.`
];

export const HowToPlay = () => {
  return (
    <div style={{ paddingTop: 30 }}>
      <Header />
      <Layout>
        <div>
          <Para weight={700}>NewsGamer is a multiplayer online game.</Para>
        </div>
        <ol style={{ lineHeight: "1.5rem", paddingRight: "10px" }}>
          {rules.map((rule, i) => (
            <li key={i} style={{ paddingBottom: "10px" }}>
              {rule}
            </li>
          ))}
        </ol>
        <div style={{ padding: "10px", textAlign: "center", fontSize: "1.2rem" }}>
          <Link to="/" style={readyButtonStyle}>
            Are you ready?
          </Link>
        </div>
      </Layout>
    </div>
  );
};

const readyButtonStyle = {
  color: "white",
  background: "green",
  padding: "10px",
  borderRadius: "5px"
};
