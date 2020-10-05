import React from "react";
import { Link } from "react-router-dom";
import classes from "../styles/header.module.css";

const Header = () => {
  return (
    <>
      <div className={classes.header}>
        <div className={classes.newsgamer}>
          <Link to="/">
            <span
              style={{ color: "white", background: "black", padding: "0 4px" }}
            >
              News
            </span>
            Gamer
          </Link>
        </div>
        <div>
          <Link to="/how-to-play">How to play?</Link>
        </div>
      </div>
    </>
  );
};

export default Header;
