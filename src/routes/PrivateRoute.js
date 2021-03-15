import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return <Route {...rest} render={(props) => (isAuthenticated ? <Component {...rest} {...props} /> : <Redirect to="/login" />)} />;
};

export default PrivateRoute;
