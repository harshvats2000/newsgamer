import React from "react";
import styled from "styled-components";

interface Props {
  children: {};
}

export const Layout = ({ children }: Props) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.main`
  margin-top: 65px;
`;
