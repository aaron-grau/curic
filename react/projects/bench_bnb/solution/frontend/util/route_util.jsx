import React from 'react';
import { Route, Redirect, Link } from 'react-router-dom';

export const AuthRoute = ({component: Component, path, loggedIn}) => (
  <Route path={path} render={(props) => (
    !loggedIn ? (
      <Component {...props}/>
    ) : (
      <Redirect to="/" />
    )
  )}/>
);

export const ProtectedRoute = ({component: Component, path, loggedIn}) => (
  <Route path={path} render={(props) => (
     loggedIn ? (
      <Component {...props}/>
    ) : (
      <Redirect to="/login"/>
    )
  )}/>
);

export const ReviewLink = ({ label, to}) => (
  <Route path={to} children={({ match }) => (
    <div>
      {match ? '' : <Link to={to}>{label}</Link>}
    </div>
  )}/>
);

