import React from "react";
import { Route, Redirect } from "react-router-dom";

const RouteGuard = ({ component: Component, auth, redirection, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !!auth ? <Component {...props} /> : <Redirect to={redirection} />
    }
  />
);

export default RouteGuard;
