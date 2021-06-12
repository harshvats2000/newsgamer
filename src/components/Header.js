import React from "react";
import { Link } from "react-router-dom";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";

const HeaderEl = styled.header`
  display: flex;
  align-items: center;
  font-family: "Cinzel Decorative", cursive;
  justify-content: space-between;
  box-shadow: 0 0 5px gray;
  padding: 10px 5px;
  height: 65px;
  position: fixed;
  top: 0;
  width: 100vw;
  background: white;
  z-index: 10;
`;

const NewsGamer = styled.div`
  font-size: 2rem;
  span {
    color: white;
    background: black;
    padding: 0 4px;
  }
`;

export const Header = () => {
  const drop = useSpring({
    config: { mass: 2, tension: 500 },
    from: { transform: "translateY(-100px)" },
    to: { transform: "translateY(0)" }
  });
  return (
    <>
      <HeaderEl>
        <NewsGamer>
          <Link to="/">
            <span>News</span>
            Gamer
          </Link>
        </NewsGamer>
        <animated.div style={drop}>
          <Link to="/how-to-play">
            <i className="fa fa-question-circle" style={{ paddingRight: "8px", fontSize: "2.4rem" }} />
          </Link>
        </animated.div>
      </HeaderEl>
    </>
  );
};
