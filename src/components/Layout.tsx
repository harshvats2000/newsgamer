import React from "react";
import styled from "styled-components";

interface Props {
  children: {};
}

export const Layout = ({ children }: Props) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.main`
  margin-top: 56px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
`;
