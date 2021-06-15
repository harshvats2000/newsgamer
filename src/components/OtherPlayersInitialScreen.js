import React from "react";

export const OtherPlayersInitialScreen = ({ game }) => {
  return (
    <>
      <h2 style={{ paddingLeft: "10px" }}>Game is not yet started by {game?.createdby}.</h2>
    </>
  );
};
