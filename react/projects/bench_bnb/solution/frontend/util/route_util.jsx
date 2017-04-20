import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const AuthRoute = ({Component, path, loggedIn}) => {
  return <Route path={path} render={(props) => (
    !loggedIn ? (
      <Component {...props}/>
    ) : (
      <Redirect to="/" />
    )
  )}/>
}

export const ProtectedRoute = ({Component, path, loggedIn}) => {
  return <Route path={path} render={(props) => (
     loggedIn ? (
      <Component {...props}/>
    ) : (
      <Redirect to="/login"/>
    )
  )}/>
}
