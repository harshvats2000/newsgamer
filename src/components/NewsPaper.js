import React from "react";

export const NewsPaper = ({ content, game, handleClick }) => {
  return (
    <div className="newspaper">
      {content[game?.paraindex].split(" ").map((word, i) => {
        let id = word.trim().replace("”", "").replace("“", "").replace(",", "") + i;
        return (
          <span key={i} style={{ whiteSpace: "initial" }}>
            <span id={id} onClick={(e) => handleClick(id)}>
              {word}
            </span>{" "}
          </span>
        );
      })}
    </div>
  );
};