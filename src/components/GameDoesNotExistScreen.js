import React from "react";
import { Link } from "react-router-dom";
import { Button } from "ui";

export const GameDoesNotExistScreen = () => {
  return (
    <div style={{ paddingTop: "50px" }}>
      <p className="para">This game is either over or deleted.</p>
      <div style={{ textAlign: "center" }}>
        <Link to="/">
          <Button bg="black">
            <i className="fa fa-arrow-left btn-icon" />
            Go Back To Home
          </Button>
        </Link>
      </div>
    </div>
  );
};
