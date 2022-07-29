import { theme } from "../constants";
import React from "react";
import { Link } from "react-router-dom";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";

export const Header = () => {
  const drop = useSpring({
    config: { mass: 2, tension: 500 },
    from: { transform: "translateY(-100px)" },
    to: { transform: "translateY(0)" }
  });
  return (
    <Wrapper>
      <Container>
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
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  height: 56px;
  position: fixed;
  top: 0;
  width: 100vw;
  box-shadow: 0 1px 7px 0 rgba(0, 0, 0, 0.6);
  background: ${theme.colors.surface};
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 5px;
  max-width: 1300px;
  margin: auto;
`;

const NewsGamer = styled.div`
  font-family: "Cinzel Decorative", cursive;
  font-size: 24px;
  span {
    color: white;
    background: black;
    border-radius: 5px;
    padding: 0 10px;
  }
`;
