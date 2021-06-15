import React from "react";
import styled, { css } from "styled-components";

const backgroundStyles = (variant) => {
  if (variant === "green") {
    return css`
      background: linear-gradient(180deg, #27f662 0%, #007220 100%);
    `;
  } else if (variant === "red") {
    return css`
      background: linear-gradient(180deg, #ff9494 0%, #a40000 100%);
    `;
  } else {
    return css`
      background: black;
    `;
  }
};

const ButtonEl = styled.button`
  ${(props) => backgroundStyles(props.variant)}
  font-size: ${(props) => props.size};
  border: none;
  padding: 8px 10px;
  border-radius: 5px;
  text-transform: capitalize;
  cursor: pointer;
  font-weight: bold;
  color: ${(props) => props.color};
`;

export const Button = (props) => {
  const { children, color = "white", size = "16px", variant = "black", ...rest } = props;
  return (
    <ButtonEl {...{ color, size, variant }} {...rest}>
      {children}
    </ButtonEl>
  );
};
