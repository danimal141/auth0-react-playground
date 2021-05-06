import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import { Route } from "react-router-dom";

const PrivateRoute = ({ component, ...args }: any) => {
  return (
    <Route component={withAuthenticationRequired(component, {})} {...args} />
  );
};

export default PrivateRoute;
