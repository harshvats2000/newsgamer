import React from "react";

export const Layout = (props) => {
  const { children } = props;
  return <div style={{ marginTop: 65 }}>{children}</div>;
};
