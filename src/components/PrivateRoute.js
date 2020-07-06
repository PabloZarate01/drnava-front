import React from "react";
import { Route, Redirect } from "react-router-dom";
import { cmsAPI } from "../utils/http-client";
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      localStorage.getItem("logged")
        ? <Component {...props}/>
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
    )} />
  )
  export default PrivateRoute