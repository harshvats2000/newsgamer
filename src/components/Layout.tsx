import React from "react";
import styled, { ThemeProvider } from "styled-components";

interface Props {
  children: {};
}

const theme = {
  dark: {
    text: "#b9b9b9",
    bg: "#272727",
  },
};

export const Layout = ({ children }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>{children}</Wrapper>
    </ThemeProvider>
  );
};

const Wrapper = styled.main`
  margin-top: 65px;
`;
