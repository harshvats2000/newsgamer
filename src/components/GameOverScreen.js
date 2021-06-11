import React from "react";
import { Link } from "react-router-dom";

const GameOverScreen = ({ currGame, displayName }) => {
  const initial_array = currGame.players.map((player) => ({
    name: player,
    score: currGame?.[player].length
  }));

  const sorted_array = initial_array.sort((a, b) => b.score - a.score);

  return (
    <>
      <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
        <div>
          <h1 style={{ textAlign: "center" }}>Game Over</h1>
          <h3 style={{ textAlign: "center" }}>{currGame.winner === displayName ? "You Won 🏆." : "You Lose!"}</h3>
          <hr />
          <div>
            {sorted_array.map((player, i) => {
              return (
                <div
                  style={{
                    color: player.name === displayName ? "green" : "red",
                    fontWeight: "600",
                    marginBottom: "8px"
                  }}
                >
                  {i + 1}. {player.name}: {player.score}
                </div>
              );
            })}
          </div>
          <Link to="/">
            <button className="btn btn-black" style={{ marginTop: "20px" }}>
              Go back to home page
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default GameOverScreen;
