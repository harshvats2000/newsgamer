import React from "react";
import styled, { css } from "styled-components";

interface Props {
  color: string,
  size: string,
  variant: string,
  children: {},
}

export const Button = (props: Props) => {
  const {
    children,
    color = "white",
    size = "16px",
    variant = "black",
    ...rest
  } = props;
  return (
    <ButtonEl {...{ color, size, variant }} {...rest}>
      {children}
    </ButtonEl>
  );
};

const backgroundStyles = (variant: string) => {
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

interface ButtonProps {
  variant: string,
  size: string;
}

const ButtonEl = styled.button<ButtonProps>`
  ${(props) => backgroundStyles(props.variant)}
  font-size: ${(props) => props.size};
  padding: 8px 15px;
  border-radius: 4px;
  border: none;
  text-transform: capitalize;
  cursor: pointer;
  color: ${(props) => props.color};
  transition: 0.3s;
`;
