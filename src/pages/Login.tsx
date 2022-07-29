import React from "react";
import { Redirect } from "react-router-dom";
import { Header } from "components";
import { max_score, theme } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { login } from "actions";
import { Button, Para } from "ui";
import styled from "styled-components";
import { RootState } from "store";

const Body = styled.div`
  height: 100vh;
  background-color: ${theme.colors.bgDark};
  display: grid;
  place-items: center;
  & > div {
    text-align: center;
  }
`;
const MaxScore = styled.span`
  font-weight: 700;
  font-size: 1.2rem;
`;
const Footer = styled.div`
  margin-top: -100px;
  text-align: center;
  svg {
    width: 20px;
    height: 20px;
    vertical-align: bottom;
  }
  a {
    color: blue;
    font-weight: 900;
    text-decoration: underline;
  }
`;

export const Login = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <div>
      {isAuthenticated ? <Redirect to="/" /> : null}
      <Header />
      <div>
        <Body>
          <div>
            <Para>
              Find and click <MaxScore>{max_score}</MaxScore> words to win.
            </Para>
            <Button onClick={() => dispatch(login())}>Login with Google</Button>
          </div>
        </Body>

        <Footer>
          Created with{" "}
          <svg className="heart" viewBox="0 0 32 29.6">
            <path
              fill="red"
              d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
	c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
            />
          </svg>{" "}
          by <a href="https://www.harshvats.dev">Harsh Vats</a>
        </Footer>
      </div>
    </div>
  );
};
