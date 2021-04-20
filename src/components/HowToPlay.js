import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import { max_score } from "../constants";
import Layout from "./Layout";
import { Para } from "../ui/Para";

const rules = [
  "To play this game, you must be logged in with a Google account.",
  "Click on create new game. This will take you to game page. The game will be created but will not start until you click on start game button.",
  "Anyone who will visit the new game page url will automatically be joined to the game.",
  "All the participants can see each other's name and score at the top of game page.",
  "A letter will appear at the top of game page. It will be same for all players so that the difficulty level is same for all players.",
  "Once the game is started, the paragraph will appear and players have to search words starting with the given letter.",
  "Clicking the appropriate word will increase your score by 1.",
  `Player who find ${max_score} appropriate words will be the winner.`
];

const HowToPlay = () => {
  return (
    <div>
      <Header />

      <Layout>
        <div>
          <Para weight={700}>NewsGamer is a multiplayer online game.</Para>
        </div>
        <ol
          style={{
            lineHeight: "1.5rem",
            paddingRight: "10px"
          }}
        >
          {rules.map((rule, i) => (
            <li key={i} style={{ paddingBottom: "10px" }}>
              {rule}
            </li>
          ))}
        </ol>

        <div
          style={{
            padding: "10px",
            textAlign: "center",
            fontSize: "1.8rem"
          }}
        >
          <Link
            to="/"
            style={{
              color: "white",
              background: "green",
              padding: "10px",
              borderRadius: "5px"
            }}
          >
            Are you ready?
          </Link>
        </div>
      </Layout>
    </div>
  );
};

export default HowToPlay;
