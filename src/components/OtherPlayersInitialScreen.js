import { getDisplayNameByUid } from "functions/getDisplayNameByUid";
import React, { useState } from "react";

export const OtherPlayersInitialScreen = ({ game }) => {
  const [hostName, setHostName] = useState(null);

  React.useEffect(() => {
    getDisplayNameByUid(game?.createdby).then((name) => setHostName(name));
  }, [game]);

  return (
    <>
      <h2 style={{ paddingLeft: "10px" }}>
        Game is not yet started by {hostName}.
      </h2>
    </>
  );
};
