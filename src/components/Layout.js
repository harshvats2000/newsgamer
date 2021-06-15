import React from "react";
import styled from "styled-components";

export const Layout = (props) => {
  const { children } = props;
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.main`
  margin-top: 65px;
`;
