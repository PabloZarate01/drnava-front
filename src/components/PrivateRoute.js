import React from "react";
import { Route, Redirect } from "react-router-dom";
import { cmsAPI } from "../utils/http-client";
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      cmsAPI.get("/auth")
      .then(response=>{
        console.log("PR-Response",response)
      })
      .catch(err=>{
        localStorage.removeItem("logged");
        localStorage.removeItem("user");
        localStorage.removeItem("userJWT");
        props.history.push('/login');
      }),
      localStorage.getItem("logged")
        ? <Component {...props}/>
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
    )} />
  )
  export default PrivateRoute