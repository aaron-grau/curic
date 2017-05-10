import React from 'react';
import { Route, Link } from 'react-router-dom';

export const ReviewLink = ({ label, to }) => (
  <div>
    <Route 
      path={to} 
      render={() => <Link to={to}>{label}</Link>} />
  </div>
)
