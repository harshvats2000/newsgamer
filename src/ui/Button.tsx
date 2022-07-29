import { theme } from "../constants";
import React from "react";
import styled, { css } from "styled-components";

interface Props {
  color?: string;
  size?: string;
  variant?: string;
  children: {};
  onClick?: () => void;
  style?: {};
}

export const Button = (props: Props) => {
  const { children, color = "white", size = "16px", variant = "black", onClick, style = {} } = props;
  return <ButtonEl {...{ color, size, variant, onClick, style }}>{children}</ButtonEl>;
};

const backgroundStyles = (variant: string) => {
  // if (variant === "green") {
  //   return css`
  //     background: linear-gradient(180deg, #00e240 0%, #007220 100%);
  //   `;
  // } else if (variant === "red") {
  //   return css`
  //     background: linear-gradient(180deg, #ff9494 0%, #a40000 100%);
  //   `;
  // } else {
  //   return css`
  //     background: ${theme.colors.surface};
  //   `;
  // }
  return css`
    background: ${theme.colors.surface};
  `;
};

interface ButtonProps {
  variant: string;
  size: string;
}

const ButtonEl = styled.button<ButtonProps>`
  ${(props) => backgroundStyles(props.variant)}
  font-size: ${(props) => props.size};
  padding: 12px 20px;
  border-radius: 4px;
  border: none;
  text-transform: capitalize;
  cursor: pointer;
  color: ${theme.colors.textLight};
  transition: 0.3s;
  box-shadow: 0 1px 7px 0 rgba(0, 0, 0, 0.6);
`;
