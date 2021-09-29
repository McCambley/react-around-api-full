import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function AuthorizationRoute({ loggedIn, children }) {
  // if user is logged in, redirect to main page until logged out
  return <Route>{!loggedIn ? children : <Redirect to="/" />}</Route>;
}
