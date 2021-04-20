import React from "react";
import styled from "styled-components";

const ButtonEl = styled.button`
  font-size: ${(props) => props.size};
  border: none;
  padding: 8px 10px;
  border-radius: 5px;
  text-transform: capitalize;
  cursor: pointer;
  font-weight: bold;
  background: ${(props) => props.bg};
  color: ${(props) => props.color};
`;

export const Button = (props) => {
  const { children, bg = "black", color = "white", size = "16px", ...rest } = props;
  return (
    <ButtonEl {...rest} bg={bg} color={color} size={size}>
      {children}
    </ButtonEl>
  );
};
