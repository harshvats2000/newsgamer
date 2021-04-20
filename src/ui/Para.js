import React from "react";
import styled from "styled-components";

const ParaEl = styled.p`
  line-height: ${(props) => props.lh};
  padding: 10px;
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  margin: ${(props) => props.m};
  text-align: ${(props) => props.align};
`;

export const Para = (props) => {
  const { children, color = "black", size = "16px", lh = "1rem", weight = 400, align = "left", m = "10px", ...rest } = props;
  return (
    <ParaEl {...rest} color={color} size={size} weight={weight} m={m} lh={lh} align={align}>
      {children}
    </ParaEl>
  );
};
