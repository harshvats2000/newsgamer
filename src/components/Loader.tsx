import React from "react";
import BarLoader from "react-spinners/BarLoader";
import styled from "styled-components";

export const Loader = () => {
  return (
    <Wrapper>
      <BarLoader color="white" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  height: 300px;
`;
