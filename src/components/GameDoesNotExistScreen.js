import React from "react";
import { Link } from "react-router-dom";

export const GameDoesNotExistScreen = () => {
  return (
    <div style={{ paddingTop: "50px" }}>
      <p className="para">This game is either over or deleted by the host.</p>
      <div style={{ textAlign: "center" }}>
        <Link to="/">
          <button className="btn btn-black">
            <i className="fa fa-arrow-left btn-icon" />
            Go Back To Home
          </button>
        </Link>
      </div>
    </div>
  );
};
