import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const HowToPlay = () => {
  return (
    <>
      <Header />
      <div>
        <div>
          <p className="para">NewsGamer is a multiplayer online game.</p>
        </div>
        <ol style={{ lineHeight: "1.8rem", paddingRight: "10px" }}>
          <li>
            To play this game, you must be logged in with a Google account.
          </li>

          <li>
            Click on create new game. This will take you to game page. The game
            will be created but will not start until you click on start game
            button.
          </li>

          <li>
            Anyone who will visit the new game page url will automatically be
            joined to the game.
          </li>

          <li>
            All the participants can see each other's name and score at the top
            of game page.
          </li>

          <li>
            A letter will appear at the top of game page. It will be same for
            all players to maintain the difficulty level same for all players.
          </li>

          <li>
            Once the game is started, the paragraph will appear and players have
            to search words starting with the given letter.
          </li>

          <li>Clicking the appropriate word will increase your score by 1.</li>

          <li>Player who find 10 appropriate words will be the winner.</li>
        </ol>

        <div
          style={{
            padding: "10px",
            textAlign: "center",
            fontSize: "1.8rem",
          }}
        >
          <Link
            to="/"
            style={{
              color: "white",
              background: "green",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            Are you ready?
          </Link>
        </div>
      </div>
    </>
  );
};

export default HowToPlay;
