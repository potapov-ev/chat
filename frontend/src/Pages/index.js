import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { UserContext } from "context/UserContext"

import ChatPage from "./Chat";
import AuthPage from "./Auth";

const BasePage = () => {
  const { isUserLogged } = useContext(UserContext);
  return (
    <Switch>
      <Route path="/auth" render={AuthPage} />
      <Route path={[ "/", "/chat" ]} render={isUserLogged ? ChatPage : AuthPage} />
      <Redirect to="/" />
    </Switch>
  )
};

export default BasePage;