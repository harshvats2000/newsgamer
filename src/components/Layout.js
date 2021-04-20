import React from "react";

const Layout = (props) => {
  const { children } = props;
  return <div style={{ marginTop: 65 }}>{children}</div>;
};

export default Layout;
