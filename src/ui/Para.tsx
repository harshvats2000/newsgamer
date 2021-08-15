import React from "react";
import styled from "styled-components";
interface Props {
  color?: string;
  size?: string;
  children: {};
  lh?: string;
  weight?: number;
  align?: string;
  m?: string;
  style?: {};
}

export const Para = (props: Props) => {
  const {
    children,
    color = "black",
    size = "16px",
    lh = "1rem",
    weight = 400,
    align = "left",
    m = "10px",
    style = {},
  } = props;

  return (
    <ParaEl {...{ color, size, weight, m, lh, align, style }}>
      {children}
    </ParaEl>
  );
};

const ParaEl = styled.p<Props>`
  line-height: ${(props) => props.lh};
  padding: 10px;
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  margin: ${(props) => props.m};
  text-align: ${(props) => props.align};
`;
