import React from "react";
import { Link } from "react-router-dom";
import { Button } from "ui";
import { Header } from "./Header";

export const GameDoesNotExistScreen = () => {
  return (
    <>
      <Header />
      <div style={{ paddingTop: "200px" }}>
        <p className="para text-center">This game is either over or deleted.</p>
        <div className="text-center">
          <Link to="/">
            <Button>
              {/* <i className="fa fa-arrow-left btn-icon" /> */}
              Go To Home
            </Button>
          </Link>
          <Link to="/profile/me">
            <Button>Go To Profile</Button>
          </Link>
        </div>
      </div>
    </>
  );
};
